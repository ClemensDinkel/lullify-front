// add an object here when you want to add a new form field.
// name is crucial and needs to match the schema, everything else is technically optional although a description wouldn't hurt for UI/UX

const formList = [
  {
    name: "title",
    description: "Video Title",
    type: "text",
    required: true,
    maxLength: "40",
    tooltip: "Video title should have maximum 40 characters.",
    placeholder: "Enter title"
  }, {
    name: "artist",
    description: "Artist",
    type: "text",
    required: true,
    maxLength: "20",
    tooltip: "Artist name should have maximum 20 characters.",
    placeholder: "Enter artist"
  }, {
    name: "video_url",
    description: "Video URL",
    type: "url",
    required: true,
    placeholder:"Enter URL",
    pattern: "https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b*([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
  }, {
    name: "video_img_url",
    description: "Image or thumbnail URL",
    type: "url",
    required: true,
    placeholder: "Enter URL for thumbnail",
    pattern: "https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b*([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
  }, {
    name: "short_description",
    description: "Video description",
    as: "textarea",
    required: true,
    placeholder: "Enter short description",
    rows: 3
  }, {
    name: "duration",
    description: "Video duration (in secs)",
    type: "number"
  }, {
    name: "languages",
    description: "Languages",
    type: "text",
    required: true,
    tooltip: `Enter languages code by separating each of them with comma ',' . For code use the hint.`,
    hint: "https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"
  }
]

export default formList