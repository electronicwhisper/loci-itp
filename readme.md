# URLs

## `/`

The index page is where the entire app is served. Different "pages" happen when you put in different hashes (the part of the URL after the `#`).

All of the HTML of the app is in `index.html`. So you can modify this page if you have to futz with the logo or wording of the pages. Note there's some stuff I added at the top of `css/style.css` so make sure not to remove that stuff.

Here are the hash pages/URLs:

### `/#project=39`

A project page. When you go here it will add the project to the cookie and associate it with a president. So you need to make the QR codes to point to these pages.

### `/#list`

The "Review Your Path" page.

### `/#path=3,55,92,6,9,1,63`

This is the URL that we send to people's emails for their future reference. When someone goes to this URL, it will reset their cookie to be that particular path. So this is the mechanism that we "transfer" the cookie from one device to another.

### `/#about` and `/#scan` and `#success`

Just static pages. But change the words on the success page (`index.html` lines 132-137). And redirect the php mailer to `/#success`.

## `/clear.html`

Going here will clear your cookie. For debugging.

## `/allprojects.html`

This will show a table of all the projects: their number (which you need for the QR code URL), title, creator. Print this page.

# Presidents & Projects Database Files

## `js/presidentsDB.js`

Add the rest of the presidents to this file, following the format. Make sure to put commas between each president (you missed these with the file you sent earlier).

## `js/projectsDB.js`

This was automatically generated. Hopefully you won't need to modify this. But I guess if new projects get added to the show and you want to include them in Loci you can add them manually. Probably not worth it.