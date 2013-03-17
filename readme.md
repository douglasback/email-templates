#Email Template Boilerplate

##tl;dr

1. Use `responsive.html` to create your email
2. Put your styles in `css/styles.css` and `styles/media-queries.css`
2. Use `grunt inline` to inline your stylesheet and embed the media query
3. Your final email is at `dist/inline.min.html`

##Usage

1. Download this repo
2. Run `npm install`
3. You'll have 3 files to edit: 
    - `responsive.html`: The markup for the email
    - `css/styles.css`: The desktop stylesheet for the email
    - `css/media-queries.css`: The mobile stylesheet for the email
    - Leave `media-queries.min.css` alone — Grunt will recompile it.
4. When you're done creating your email, run `grunt inline` to put all of the appropriate CSS inline, and embed the media query stylesheet in the `<head>`.
5. Your final email will be created at `dist/inline.min.html`. Use this to create your header and footer wrappers.

##Known issues:

- Juice doesn't add `width` attributes to `<table>` and `<td>` elements; this means Lotus 6.5 and 7 will not render the email correctly.
    - The workaround: add width attributes to `inline.min.html` where needed.
- Outlook 2007/2010 has awful support for font styles. Currently, their default email font is used to render the email.