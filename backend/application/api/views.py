from django.http import HttpResponse, JsonResponse
from .models import *
import uuid 
import json
import pandas
from django.utils.dateparse import parse_datetime

"""
    Health (GET) : Returns 200 if the application is running 
"""
def health(request):
    return HttpResponse("Hello World",status=200)

"""
    Employees (GET) : Returns a list of employees
        Parameters:
        - count (int) : Specify the number of records to retrieve 100 max
"""
def employee(request):
    if request.method == "GET":
        #filters 
        filter_full_name = request.GET.get('full_name')
        filter_employee_id = request.GET.get('employee_id')
        filter_department = request.GET.get('department')

        # Objects 
        employees_objects = Employee.objects.all()

        # Check filters 
        if filter_full_name:
            employees_objects = employees_objects.filter(full_name__contains=filter_full_name)

        # Get the employees 
        employees = [employee.toDictionary() for employee in employees_objects]

        # return employees 
        return JsonResponse(employees,safe=False)
    
    if request.method == "POST":
        data = json.loads(request.body)

        # Get the company from the token 
        company = Company.objects.all()[0]

        # Pre-checks - check the employee does not exists
        if (Employee.objects.filter(company=company,employee_id=data["employeeId"]).exists()):
            return HttpResponse("Employee Exists",status=409)

        # Get the department or create the department
        department = None 
        if (CompanyDepartment.objects.filter(company=company,name=data["department"]).exists()):
            department = CompanyDepartment.objects.get(company=company,name=data["department"])
        else:
            department = CompanyDepartment(company=company,name=data["department"])
            department.save()

        # Create Record
        new_employee = Employee(
                id = Employee.objects.last().id + 1,
                company=company,
                full_name = data["fullName"],
                employee_id = data["employeeId"],
                profile_picture = data["profilePicture"],
                department = department
            )
        
        new_employee.save()
        
        # Create Prev Role
        prev_role = EmployeeRole(
            employee = new_employee,
            title = data["title"],
            date_started = parse_datetime(data["dateStarted"]),
            date_left = parse_datetime(data["dateLeft"]),
            duties = data["duties"],
            company = data["company"]
        )

        prev_role.save()

        # Return Response
        return HttpResponse(new_employee.employee_id)
    
    if request.method == "PUT":
        data = json.loads(request.body)

        # Get the company
        company = Company.objects.all()[0]
        
        # Get the employee id from the company 
        # If there is an injection hokoyo
        employee = Employee.objects.get(id=data["data"]["id"])
        
        # Get the department or create the department
        department = None 
        if (CompanyDepartment.objects.filter(company=company,name=data["data"]["department"]).exists()):
            department = CompanyDepartment.objects.get(company=company,name=data["data"]["department"])
        else:
            department = CompanyDepartment(company=company,name=data["data"]["department"])
            department.save()

        # Perform update on employee 
        employee.full_name =  data["data"]["full_name"]
        employee.employee_id = data["data"]["employee_id"]
        employee.department = department
        employee.save()

        # Update Role
        if "roles" in data:
            prev_role = EmployeeRole(
                employee = employee,
                title = data["roles"]["title"] if "title" in data["roles"] else "None",
                date_started = parse_datetime(data["roles"]["date_started"]) if "date_started" in data["roles"] else parse_datetime(datetime.datetime.now()),
                date_left = parse_datetime(data["roles"]["date_left"]) if "date_left" in data["roles"] else None,
                duties = "",
                company = data["roles"]["company"] if "company" in data["roles"] else "None"
            )

            prev_role.save()
        
        return HttpResponse("Hello World")
    
"""
    Employees CSV
"""
def employeesCSV(request):
    # Get the company from the token 
    company = Company.objects.all()[0]

    # Get uploaded file
    file = request.FILES.get("file")
   
    # Relative file path to store the file 
    r_fpath = f"uploads/{str(uuid.uuid4())}-{file.name}"

    # Write to the file 
    with open(r_fpath,"wb") as file_to_store:
        file_to_store.write(file.read())

    # Perform operations 
    df = pandas.read_excel(r_fpath)

    # Stores the failed actions 
    failed = []

    # Iterate the rows 
    for index, row in df.iterrows():
        # Switch actions 
        if row["ACTION"] == "CREATE":
            # Get the department or create the department
            department = None 
            if (CompanyDepartment.objects.filter(company=company,name=row["DEPARTMENT"]).exists()):
                department = CompanyDepartment.objects.get(company=company,name=row["DEPARTMENT"])
            else:
                department = CompanyDepartment(company=company,name=row["DEPARTMENT"])
                department.save()

            # Create Record
            new_employee = Employee(
                    company=company,
                    full_name = row["FULL_NAME"],
                    employee_id = row["EMPLOYEE_ID"],
                    profile_picture = row["PROFILE_PICTURE_URL"],
                    department = department
            )

            try:
                new_employee.save()
            except:
                failed.append({
                    "EMPLOYEE_ID" : row["EMPLOYEE_ID"],
                    "EVENT" : "EMPLOYEE_ID_EXISTS" 
                })

                continue

            # Create Prev Role
            prev_role = EmployeeRole(
                employee = new_employee,
                title = row["PREV_ROLE_TITLE"],
                date_started = row["PREV_ROLE_DATE_STARTED"],
                date_left = row["PREV_ROLE_DATE_LEFT"],
                duties = row["PREV_ROLE_DUTIES"],
                company = row["PREV_ROLE_COMPANY"]
            )

            prev_role.save()
 
        if row["ACTION"] == "UPDATE":
            # Get the employee
            employee = Employee.objects.filter(company=company,employee_id=row["EMPLOYEE_ID"])
            # Employee does not exist
            if len(employee) == 0:
                failed.append({
                    "EMPLOYEE_ID" : row["EMPLOYEE_ID"],
                    "EVENT" : "EMPLOYEE_DOESNT_EXIST"
                })
                continue

            employee = employee[0]

            # Handle department
            department = None 
            if (CompanyDepartment.objects.filter(company=company,name=row["DEPARTMENT"]).exists()):
                department = CompanyDepartment.objects.get(company=company,name=row["DEPARTMENT"])
            else:
                department = CompanyDepartment(company=company,name=row["DEPARTMENT"])
                department.save()

            # Update the employee
            employee.department = department
            employee.full_name = row["FULL_NAME"]
            employee.profile_picture = row["PROFILE_PICTURE_URL"]
            employee.last_updated = datetime.datetime.now()
            employee.save()

        # Switch actions 
        if row["ACTION"] == "DELETE":
            Employee.objects.filter(company=company,employee_id=row["EMPLOYEE_ID"]).delete()

                
                

    return JsonResponse(failed,safe=False,status=200)