import Handlebars from "handlebars";
import fs from "fs";

// export const compileTemplate = (data: any) => {
//     const templateSource = fs.readFileSync("./templates/template1.hbs", "utf8");
//     const template = Handlebars.compile(templateSource);
//     return template(data);
// };

const data = {
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
  summary:
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  education: [
    {
      degree: "Bachelor of Science",
      field: "Computer Science",
      school: "University of Somewhere",
      year: "2022",
    },
  ],
  work: [
    {
      position: "Software Developer",
      company: "Tech Innovations Inc.",
      startYear: "2022",
      endYear: "Present",
      responsibilities: [
        "Developing and maintaining web applications",
        "Collaborating with the design team to implement new features",
        "Writing clean, efficient, and documented code",
      ],
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "HTML/CSS"],
};

const templateSource = fs.readFileSync("./src/templates/template1.hbs", "utf8");
// const templateTest = fs.readFileSync("./src/templates/test.hbs", "utf8");

const template = Handlebars.compile(templateSource);
// const template1 = Handlebars.compile(templateTest);

export const htmlContent = template(data);
// export const htmlContent = template1(data);
