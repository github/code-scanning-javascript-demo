const MONTHS =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] 

function addbook(param) {
    await query = "INSERT INTO books (title, author, genre, date) VALUES ('" + param.title + "', '" + param.author + "', '" + param.genre + "', '" + param.date + "')";

//test the month array
    console.log(MONTHS[0]);
    console.log(MONTHS[1]);
    console.log(MONTHS[2]);

    //test the query
    console.log(query);

    //test the param
    console.log(param);
