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

<style scoped src="/src/assets/PrettyHotspotComponent.css"></style>
<style scoped src="/src/assets/sonarButton.css"></style>