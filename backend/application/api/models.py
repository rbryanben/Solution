from django.db import models
import datetime
from django.utils.dateparse import parse_datetime

# For JS 
format_string = "%Y-%m-%d"

# Company Model 
class Company(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False)
    registration_date = models.DateField(auto_now=True,null=False)
    registration_number = models.CharField(max_length=255,null=False,blank=False)
    address = models.TextField(null=False,blank=False)
    contact_person = models.CharField(max_length=255,null=False,blank=False)
    contact_phone = models.CharField(max_length=255)
    email_address = models.EmailField(null=False,blank=False)

# Department Model 
class CompanyDepartment(models.Model):
    name = models.CharField(max_length=60,null=False,blank=False)
    company = models.ForeignKey(Company,on_delete=models.CASCADE)

# Employee Model 
class Employee(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE,null=True)
    full_name = models.CharField(max_length=255)
    profile_picture = models.CharField(max_length=24000)
    employee_id = models.CharField(max_length=255, blank=True, null=True)
    department = models.ForeignKey(CompanyDepartment,on_delete=models.CASCADE,null=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["company","employee_id"],name="unique_employee_company")
        ]

    def toDictionary(self):
        return {
            "id" : self.id,
            "company" : self.company.name if self.company != None else None ,
            "full_name": self.full_name,
            "profile_picture" : self.profile_picture,
            "employee_id" : self.employee_id,
            "department" : self.department.name if self.department != None else None,
            "last_updated" : self.last_updated.strftime(format_string),
            "roles": [role.toDictionary() for role in EmployeeRole.objects.filter(employee=self)]
        }
    
    

# Employee Role 
class EmployeeRole(models.Model):
    employee = models.ForeignKey(Employee,on_delete=models.CASCADE,null=False)
    title = models.CharField(max_length=200,null=False,default="Software Engineer")
    date_started = models.DateField(null=False,blank=False)
    date_left = models.DateField(null=True,blank=True)
    duties = models.TextField(null=False,blank=False)
    company = models.TextField()


    def toDictionary(self):
        return {
            "id" : self.id,
            "date_started" : self.date_started.strftime(format_string),
            "title" : self.title,
            "company" : self.company,
            "date_left" : self.date_left.strftime(format_string) if self.date_left != None else "present",
            "duties" : self.duties
        }
    

        


