# Code Function and Complexity Analysis

## Overall Structure

This is a static single-page electrical estimating website made from:

- `index.html`: page content and forms
- `styles.css`: visual design and responsive layout
- `script.js`: interactive behavior
- `sample-takeoff-report.pdf`: downloadable sample report
- `README.md`: minimal project note

There is no backend in the project. Form submissions are sent to the external Web3Forms service.

## Step-by-Step Runtime Flow

1. **The browser loads `index.html`.**
   - Sets page metadata, title, description, and SEO structured data.
   - Loads Google Fonts.
   - Loads `styles.css`.
   - Builds the page sections.

2. **The header is rendered.**
   - Displays the Triple 7 brand.
   - Provides navigation links to Services, Tools, Process, About, and Contact.
   - On mobile, the navigation is hidden behind the Menu button.

3. **The hero section is displayed.**
   - Shows the main marketing message.
   - Displays a CSS-created estimate illustration.
   - Provides a link to the contact form.
   - Opens the sample-report modal when `Download sample takeoff report` is clicked.

4. **The main content sections provide static information.**
   - Services
   - Estimating tools
   - Company statistics
   - Testimonials
   - Estimating process
   - Company information
   - Contact details

5. **The contact form collects project information.**
   - Uses native HTML validation such as `required` and `type="email"`.
   - Sends form data to `https://api.web3forms.com/submit`.
   - Does not reload the page because JavaScript intercepts submission.

6. **The sample-report modal works as follows.**
   - Clicking the sample button displays the modal.
   - The body receives `modal-open`, preventing background scrolling.
   - The name field receives focus automatically.
   - Clicking the backdrop, close button, or pressing Escape closes the modal.

7. **Form submission is handled by `submitToWeb3Forms()`.**
   - Disables the submit button.
   - Changes its text to `Sending...`.
   - Creates a `FormData` object.
   - Sends it with `fetch()`.
   - Displays a success or failure message.
   - Re-enables the button if the request fails.
   - Reveals the PDF download link after a successful sample-form submission.

8. **The footer year is generated automatically.**
   - JavaScript inserts the current year into the element with ID `year`.

## CSS Functionality

`styles.css` provides:

- CSS variables for the color palette and layout width.
- Desktop grid layouts for the hero, services, tools, statistics, process, and contact areas.
- Responsive layouts at `800px` and `480px`.
- Mobile navigation behavior.
- Mobile fixed contact buttons.
- CSS-generated estimate-plan graphics.
- Typography, spacing, borders, shadows, buttons, modal styling, and animations.
- Staggered entrance animations using `.reveal`, `.delay-one`, and `.delay-two`.

## Complexity

### Algorithmic complexity

The JavaScript is low complexity:

- Startup event registration: approximately $O(n)$, where $n$ is the number of matching links or buttons.
- Menu interaction: $O(1)$.
- Modal open and close: $O(1)$.
- Form submission preparation: approximately $O(f)$, where $f$ is the number of form fields.
- Network submission time depends on Web3Forms, not on this code.

There are no loops over large datasets, sorting algorithms, databases, authentication systems, or complex calculations.

### Overall project complexity

I would rate it as **low to moderate complexity**:

- **HTML:** Moderate amount of content, but structurally straightforward.
- **CSS:** Moderate complexity because of the many sections and responsive breakpoints.
- **JavaScript:** Low complexity, around 85 lines, with only a few independent behaviors.
- **Backend:** None inside the project; Web3Forms handles submissions externally.

## Important Observations

- The hero button is labeled `Request an estimate` and jumps to the contact form. It does not claim to upload plans; the form accepts a secure plan or blueprint link instead.
- The contact section explains that users can submit project details and a secure plan link for review.
- The brand tagline is `Electrical & Consulting Services` in the header, footer, and About seal.
- The trust section displays `10+` years of field experience.
- The hero proof section also displays `10+` years of field experience.
- The About seal uses the new service tagline and no longer displays `EST. 2004`.
- The header, About section, and footer use the shared `images/triple-7-logo.jpeg` asset as the main logo.
- The header and footer use a fixed overflow-hidden brand viewport to crop the JPEG's built-in white margins. The image is scaled to `118px` on desktop and `94px` on mobile, with slightly lower centered offsets so the top of the `TRIPLE` lettering is not clipped. It uses `mix-blend-mode: multiply` so the remaining white JPEG background blends into the paper surface instead of appearing as a white rectangle. This keeps the existing logo asset, alt text, header height, footer layout, and mobile navigation behavior unchanged.
- The About logo uses the same overflow-hidden crop and `mix-blend-mode: multiply` treatment inside its existing circular seal. It is explicitly centered with `top: 50%`, `left: 50%`, and `translate(-50%, -50%)`, then scaled to `380px` in the desktop/tablet seal and `310px` in the small mobile seal. Explicit anchoring prevents the flex container's static positioning from shifting the crop while preserving the About section's dimensions and alignment.
- The preferred production asset is a tightly cropped transparent SVG or PNG export of the logo. Replacing the JPEG with that asset would remove the need for blend-mode treatment while preserving the same `.brand` dimensions and markup contract.
- Form validation is mostly browser-native; there is no custom validation logic.
- The Web3Forms access key is visible in the frontend HTML, which is common for this type of service but can allow unwanted automated submissions.
- The website depends on Google Fonts and Web3Forms being available online.
- The HTML and CSS contain many very long lines, which makes future maintenance more difficult.

## Summary

This is a well-developed static marketing page with responsive design and lightweight interactivity, but it is not a complex application. Its main complexity is in the visual layout and responsive CSS rather than in the JavaScript or business logic.
