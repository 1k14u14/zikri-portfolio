export default{
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields:[
        {
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string'
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image'
        },
        {
            name: 'footerText',
            title: 'Footer Text',
            type: 'string'
        }
    ]
}