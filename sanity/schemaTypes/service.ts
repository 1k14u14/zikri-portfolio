export default{
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }
    ]
}