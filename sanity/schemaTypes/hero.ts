export default{
    name: 'hero',
    title: 'Hero',
    type: 'document',
    fields:[
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of:[{type: 'block'}]
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image'
        },
        {
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }
    ]
}