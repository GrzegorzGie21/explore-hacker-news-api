const searchItemByTitle = text => item => !text || item.title.toLowerCase().includes(text.toLowerCase());

export default searchItemByTitle;
