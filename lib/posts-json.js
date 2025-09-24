import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export function getSortedPostsData() {
    const fullPath = path.join(dataDirectory, 'posts.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const jsonObject = JSON.parse(fileContents);
    jsonObject.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
    return jsonObject.map(item => {
        return {
            id: item.id.toString(),
            title: item.title,
            description: item.description,
            date: item.date
        }
    })
}

export function getAllPostIds() {
    const fullPath = path.join(dataDirectory, 'posts.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const jsonObject = JSON.parse(fileContents);
    return jsonObject.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
            
        }
    })
}

export function getPostData(id) {
    const fullPath = path.join(dataDirectory, `posts.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const jsonObject = JSON.parse(fileContents);
    const objectRtn = jsonObject.filter(obj => {
        return obj.id.toString() === id;
    });
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