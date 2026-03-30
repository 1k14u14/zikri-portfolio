export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name'}
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        // This creates the dropdown menu!
        list: [
          { title: 'E-Commerce', value: 'E-Commerce' },
          { title: 'Landing Pages', value: 'Landing Pages' },
          { title: 'Point of Sale', value: 'Point of Sale' },
          { title: 'Portfolio', value: 'Portfolio' },
          { title: 'Card', value: 'Card' },
          { title: 'Planner', value: 'Planner' },
          { title: 'Dashboard', value: 'Dashboard' },
          { title: 'AI', value: 'AI' },
        ],
        // Optional: 'radio' creates buttons, leaving it blank or 'dropdown' creates a select menu
        layout: 'dropdown'
      }
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string'
        }
      ]
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string'}]
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }
  ]
}
