const { Client } = require("@notionhq/client");

// Initializing a Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Saves an email user entered to Notion's databse.
 */
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
