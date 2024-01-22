/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                description:
                  "Use this for external URLs only. For better performance to internal links, use the internal link option instead.",
              },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            fields: [
              {
                title: "Internal Link",
                name: "href",
                type: "string",
                description:
                  "Only include the text after the base URL (for example, /about or /volunteer).",
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            "Briefly describe the image (used for accessibility). If the image is purely decorative, leave the alt text empty.",
        },
      ],
    },
    {
      type: "object",
      name: "facebookPost",
      title: "Facebook Post",
      fields: [
        {
          name: "url",
          type: "url",
          title: "URL",
          description:
            "The URL of the Facebook post. For example, https://www.facebook.com/pawssociety/posts/10152709824098981",
        },
      ],
    },
    {
      type: "object",
      name: "googleCalendar",
      title: "Google Calendar Embed",
      fields: [
        {
          name: "url",
          type: "url",
          title: "URL",
          description:
            "The Public Calendar URL from Google. You can get this from Google Calendar Settings > Your Calendar > Scroll down to 'Integrate Calendar' and copy the public calendar url.",
        },
      ],
    },
    {
      type: "object",
      name: "shirtForm",
      title: "Shirt Form",
      fields: [
        {
          title: "Placeholder Text",
          name: "placeholder",
          type: "string",
          description:
            "The text that will appear if the form fails to load.",
        },
      ],
    },
    {
      type: "object",
      name: "volunteerForm",
      title: "Volunteer Form",
      fields: [
        {
          title: "Placeholder Text",
          name: "placeholder",
          type: "string",
          description:
            "The text that will appear if the form fails to load.",
        },
      ],
    },
  ],
};
