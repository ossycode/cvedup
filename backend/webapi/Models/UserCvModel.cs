using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Address
{
    [Required(ErrorMessage = "Street must not be empty")]
    public string Street { get; set; }

    [Required(ErrorMessage = "City must not be empty")]
    public string City { get; set; }

    [Required(ErrorMessage = "State must not be empty")]
    public string State { get; set; }

    [Required(ErrorMessage = "Post code must not be empty")]
    public string PostCode { get; set; }

    [Required(ErrorMessage = "Country must not be empty")]
    public string Country { get; set; }
}

public class PersonalInformation
{
    [Required(ErrorMessage = "First name must not be empty")]
    [MaxLength(50, ErrorMessage = "Input must be less than 50 characters")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Last name must not be empty")]
    [MaxLength(50, ErrorMessage = "Input must be less than 50 characters")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Phone number is not valid")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "Provide a valid email address")]
    [EmailAddress(ErrorMessage = "Provide a valid email address")]
    [MaxLength(50, ErrorMessage = "Input must be less than 50 characters")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Address is required")]
    public Address Address { get; set; }
}

public class Education
{
    [Required(ErrorMessage = "School name must not be empty")]
    public string SchoolName { get; set; }

    [Required(ErrorMessage = "Area of study must not be empty")]
    public string AreaOfStudy { get; set; }

    [Required(ErrorMessage = "School location must not be empty")]
    public string SchoolLocation { get; set; }

    [Required(ErrorMessage = "Qualification must not be empty")]
    public string Qualification { get; set; }

    public string Honours { get; set; }

    [Required(ErrorMessage = "Please select a start date")]
    public DateTime StartDate { get; set; }

    [Required(ErrorMessage = "Please select an end date")]
    public DateTime EndDate { get; set; }
}

public class WorkExperience
{
    [Required(ErrorMessage = "Employer name must not be empty")]
    public string EmployerName { get; set; }

    [Required(ErrorMessage = "Job title must not be empty")]
    public string JobTitle { get; set; }

    public string Location { get; set; }

    [Required(ErrorMessage = "The duties must not be empty")]
    public List<string> Duties { get; set; }

    [Required(ErrorMessage = "Please select a start date")]
    public DateTime StartDate { get; set; }

    [Required(ErrorMessage = "Please select an end date")]
    public DateTime EndDate { get; set; }
}

public class Certification
{
    [Required(ErrorMessage = "Certification name must not be empty")]
    public string CertName { get; set; }

    [Required(ErrorMessage = "Issue organisation must not be empty")]
    public string CertIssueOrganisation { get; set; }

    [Required(ErrorMessage = "Please select a certification date")]
    public DateTime CertDate { get; set; }
}

public class Reference
{
    [Required(ErrorMessage = "Reference name must not be empty")]
    public string ReferenceName { get; set; }

    public string ReferenceJobTitle { get; set; }
    public string ReferenceCompanyName { get; set; }

    [Required(ErrorMessage = "Email must not be empty")]
    [EmailAddress(ErrorMessage = "Provide a valid email address")]
    public string ReferenceEmail { get; set; }

    [Required(ErrorMessage = "Phone number is not valid")]
    public string ReferencePhoneNumber { get; set; }
}

public class CvData
{
    public PersonalInformation PersonalInformation { get; set; }
    public List<Education> Education { get; set; }
    public List<WorkExperience> WorkExperience { get; set; }
    public List<string> Skills { get; set; }
    public List<Reference> References { get; set; }
    public string Photo { get; set; }
    public List<string> Language { get; set; }
    public string Summary { get; set; }
    public List<Certification> Certifications { get; set; }
}
