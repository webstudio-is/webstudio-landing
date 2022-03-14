const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const subscribe = async ({ email }: { email: string }) => {
  return await notion.pages.create({
    parent: {
      database_id: process.env.DATABASE_ID,
    },
    properties: {
      Email: {
        title: [
          {
            text: {
              content: email,
            },
          },
        ],
      },
    },
  });
};
