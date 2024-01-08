# Vue-Pretty-Hotspot
A simple, smart and elegant package for creating hotspot images in vue js
<br><a href="https://prettyhotspot.rezagolian.com">Live Example</a>

## Installation
```
npm i vue-pretty-hotspot
```

## Config

You can add it globally:

```vue
// main.js
import {PrettyHotspotGlobal} from "vue-pretty-hotspot";
import 'vue-pretty-hotspot/style.css';

app.use(PrettyHotspotGlobal);
```

or simply import it in your components:

```vue
import { PrettyHotspot } from 'vue-pretty-hotspot'
import 'vue-pretty-hotspot/style.css';
```

## Usage
```vue
  <PrettyHotspot
      image="/src/assets/backgroundImage.webp"
      :spots="[
          {left: 35, top: 30, image: '/src/assets/someImage.webp',
          title: 'test title', description: 'test description', link: '#'},
          {left: 50, top: 60, image: '/src/assets/anotherImage.webp',
          title: 'test title 2', description: 'test description 2', link: '#'},
      ]"
  />
```
### props
- **image:** the image prop is to set the background image on which all the spots will be placed. 
- **spots:** the spots prop receives an array of spot objects the fields of which will be explained below:
  - **left and top:** these two spot values are used for positioning the spots. their unit is percentage of the background image's width and height.
  - **image:** the link for the image placed in the dropdown
  - **title:** the bold title placed in the dropdown
  - **link:** the link applied on the image and the title of the dropdown.
  - **price:** the orange text appearing below the title(it was initially meant for pricing)
  - **description:** the description appearing at the bottom of the dropdown

> [!TIP]
> all the spot fields mentioned above are optional(you can for example have a dropdown with only a title or with only a title and a description etc.)

