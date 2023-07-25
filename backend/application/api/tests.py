from django.test import TestCase
from .models import Employee, Company


class TestUploadFile(TestCase):
    """
    Tests that uploading a file creates the expected number of records.
    """

    def setUp(self):
        pass 

    def test_upload_file(self):
        file_path = "./test_files/template.xlsx"
        url = "/api/v1/uploads/csv/"

        # Create a company object because there has to be at least one
        #  company object 
        Company(id=1,name="Fincheck",registration_number="ABC122",address="No. 1",
                contact_person="John Doe",contact_phone="+26308485636",email_address="info@fincheck.com").save() 

        # Send the request 
        file = open("./test_files/template.xlsx","rb") 
        response = self.client.post(url, {"file": file})
        
        assert response.status_code == 200
        assert Employee.objects.count() == 2