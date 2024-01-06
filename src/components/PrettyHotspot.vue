<template>
  <div class="prettyHotspot">
    <figure>
      <img :src="image" alt="">
    </figure>

    <div
      v-for="(item, index) in spotsRef"
      :key="index"
      class="spot"
      :style="`left: ${item.left}%; top: ${item.top}%`"
      @mouseenter="mouseEnterSpotMethod(item, $event)"
      @mouseleave="mouseLeaveSpotMethod(item)"
    >
      <div class="sonarBtn"></div>
      <transition name="slide-fade">
        <div class="infoContainer" v-if="item.visible">
          <div class="info">
            <a :href="item.link" v-if="item.image">
              <figure>
                <img :src="item.image" alt="">
              </figure>
            </a>
            <strong v-if="item.title"><a :href="item.link">{{item.title}}</a></strong>
            <span v-if="item.price">{{item.price}}</span>
            <p v-if="item.description">{{item.description}}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    image: String,
    spots: Array,
  },
  setup(props){
    const spotsRef = ref(JSON.parse(JSON.stringify(props.spots)));

    let r = document.querySelector(':root');
    r.style.setProperty('--vue-pretty-hotspot-floating-left', '-7.3rem');

    // Get the styles (properties and values) for the root
    // let rs = getComputedStyle(r);
    // console.log("The value is: " + rs.getPropertyValue('--vue-pretty-hotspot-floating-left'));

    const mouseEnterSpotMethod = (item, e)=>{
      const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // parseFloat removes the unit('px') from string

      const sideInfoDivWidth = remSize * 16.4; // width = 13rem, padding-x = .8rem + .8rem, infoContainerPadding = 1.8rem
      const botInfoDivWidth = remSize * 14.6; // width = 13rem, padding-x = .8rem + .8rem,

      const targetRect = e.target.getBoundingClientRect();

      if (targetRect.left + sideInfoDivWidth < window.innerWidth) {
        e.target.classList.add('isRight');
        e.target.classList.remove('isLeft');
        e.target.classList.remove('isMid');
      }
      else if (targetRect.left - sideInfoDivWidth > 0){
        e.target.classList.add('isLeft');
        e.target.classList.remove('isRight');
        e.target.classList.remove('isMid');
      }
      else {
        e.target.classList.add('isMid');
        e.target.classList.remove('isLeft');
        e.target.classList.remove('isRight');

        if (targetRect.left + botInfoDivWidth / 2 > window.innerWidth){
          // goes bottom right
          let offset = targetRect.left + botInfoDivWidth - window.innerWidth;
          let left = -1 * (offset + 10);
          r.style.setProperty('--vue-pretty-hotspot-floating-left', left + 'px');
        }
        else if (targetRect.left - botInfoDivWidth / 2 < 0){
          // goes bottom left
          let offset = botInfoDivWidth / 2 - targetRect.left;
          let left = (botInfoDivWidth / 2 - offset) - 10;
          r.style.setProperty('--vue-pretty-hotspot-floating-left', -left + 'px');
        }
        else {
          // goes center
          r.style.setProperty('--vue-pretty-hotspot-floating-left', '-7.3rem');
        }
      }

      item.visible = true;
    }

    const mouseLeaveSpotMethod = (item)=>{
      item.visible = false;
    }

    return {
      mouseEnterSpotMethod,
      mouseLeaveSpotMethod,
      spotsRef,
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

img{
  width: 100%;
  height: 100%;
}

div.prettyHotspot{
  position: relative;
  width: fit-content;
  height: fit-content;
}

div.prettyHotspot > div.spot{
  position: absolute;
}

div.prettyHotspot > div.spot > div.infoContainer{
  z-index: 10;
  position: absolute;
}

div.prettyHotspot > div.spot > div.infoContainer > div.info{
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff;
  padding: .8rem;
  width: 13rem;
  display: grid;
  grid-template-columns: auto;
  grid-gap: .6rem;
  justify-items: center;
}

div.spot.isLeft > div.infoContainer{
  right: 0;
  padding-right: 1.8rem;
  top: -4rem;
}
div.spot.isMid > div.infoContainer{
  left: var(--vue-pretty-hotspot-floating-left);
  padding-top: 1.5rem;
}
div.spot.isRight > div.infoContainer{
  left: 0;
  padding-left: 1.8rem;
  top: -4rem;
}

div.prettyHotspot > div.spot > div.infoContainer > div.info > figure{}
div.prettyHotspot > div.spot > div.infoContainer > div.info > figure > img{}

div.prettyHotspot > div.spot > div.infoContainer > div.info > strong > a{
  font-size: 1rem;
  text-decoration: none;
  color: #000;
  transition: all .2s ease-in-out;
}

div.prettyHotspot > div.spot > div.infoContainer > div.info > strong > a:hover{
  color: #666;
}

div.prettyHotspot > div.spot > div.infoContainer > div.info > span{
  color: #f59a57;
  font-weight: 900;
  font-size: 1rem;
}

div.prettyHotspot > div.spot > div.infoContainer > div.info > p{
  text-align: center;
  color: #777;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* vue transitions */
.slide-fade-enter-active {
  transition: all .2s ease-in-out;
}

.slide-fade-leave-active {
  transition: all .2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>