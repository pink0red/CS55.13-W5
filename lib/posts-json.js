// Import Node.js built-in modules for working with the file system and file paths
import fs from 'fs';
import path from 'path';

// Define the path to the 'data' directory where the JSON file is stored
const dataDirectory = path.join(process.cwd(), 'data');

//Reads and returns all blog post data sorted alphabetically by title.
//Used for generating the blog list on the homepage.
export function getSortedPostsData() {

    // Build the full path to the posts.json file
    const fullPath = path.join(dataDirectory, 'posts.json');

    // Read the contents of the file as a string
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse the string into a JavaScript object (array of posts)  
    const jsonObject = JSON.parse(fileContents);
    
    // Sort the posts alphabetically by title
    jsonObject.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });

    // Map the sorted posts to a new array with only the needed fields
    return jsonObject.map(item => {
        return {
            id: item.id.toString(), // Ensure ID is a string for routing
            title: item.title,
            description: item.description, // Optional description for previews
            date: item.date
        }
    })
}


//Returns an array of objects with post IDs, formatted for use in Next.js dynamic routes.
//Used by getStaticPaths to pre-render post pages.
export function getAllPostIds() {
    // Read and parse the posts.json file
    const fullPath = path.join(dataDirectory, 'posts.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const jsonObject = JSON.parse(fileContents);
    // Return array in the format: { params: { id: '1' } }
    return jsonObject.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
            
        }
    })
}

//Returns the full data for a single post based on the given ID.
//Used by getStaticProps to pre-render the post detail page.
export function getPostData(id) {
    
    // Read and parse the posts.json file
    const fullPath = path.join(dataDirectory, `posts.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const jsonObject = JSON.parse(fileContents);

    // Filter to find the post with the matching ID
    const objectRtn = jsonObject.filter(obj => {
        return obj.id.toString() === id;
    });

    // If not found, return a fallback object
    if (objectRtn.length === 0) {
        return {
            id: id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found'
        } 

    } else {
            return objectRtn[0];
        }

}