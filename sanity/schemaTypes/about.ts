export default{
    name:'about',
    title: 'About',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'avatar',
            title: 'Avatar',
            type: 'image',
            options:{ hotspot: true }
        },
        {
            name: 'resume',
            title: 'Resume',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'hardSkills',
            title: 'Hard Skills',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            name: 'softSkills',
            title: 'Soft Skills',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            name: "certification",
            title: "Certification",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                        name: "name",
                        title: "Name",
                        type: "string",
                        },
                        {
                        name: "image",
                        title: "Image",
                        type: "image",
                        },
                        {
                        name: "issuingOrganization",
                        title: "Issuing Organization",
                        type: "string",
                        },
                        {
                        name: "issueDate",
                        title: "Issue Date",
                        type: "date",
                        },
                        {
                        name: "expirationDate",
                        title: "Expiration Date",
                        type: "date",
                        },
                        {
                        name: "credentialId",
                        title: "Credential ID",
                        type: "string",
                        },
                        {
                        name: "credentialUrl",
                        title: "Credential URL",
                        type: "url",
                        },
                    ]
                }
            ]
        },
        {
        name: "experience",
        title: "Experience",
        type: "array",
        of: [
            {
            type: "object",
            fields: [
                {
                name: "company",
                title: "Company",
                type: "string",
                },
                {
                name: "image",
                title: "Image",
                type: "image",
                },
                {
                name: "position",
                title: "Position",
                type: "string",
                },
                {
                name: "startDate",
                title: "Start Date",
                type: "date",
                },
                {
                name: "endDate",
                title: "End Date",
                type: "date",
                },
                {
                name: "description",
                title: "Description",
                type: "text",
                },
            ],
            },
        ],
        },
        {
        name: "educations",
        title: "Educations",
        type: "array",
        of: [
            {
            type: "object",
            fields: [
                {
                name: "institution",
                title: "Institution",
                type: "string",
                },
                {
                name: "image",
                title: "Image",
                type: "image",
                },
                {
                name: "major",
                title: "Major",
                type: "string",
                },
                {
                name: "studyProgram",
                title: "Study Program",
                type: "string",
                },
                {
                name: "gpa",
                title: "GPA",
                type: "string",
                },
                {
                name: "title",
                title: "Title",
                type: "string",
                },
                {
                name: "startDate",
                title: "Start Date",
                type: "date",
                },
                {
                name: "endDate",
                title: "End Date",
                type: "date",
                },
                {
                name: "description",
                title: "Description",
                type: "text",
                },
            ],
            },
        ],
        },
        {
        name: 'language',
        type: 'string',
        readOnly: true,
        hidden: true,
        }
    ]
}