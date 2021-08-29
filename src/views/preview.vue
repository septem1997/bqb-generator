<template>
  <div class="page" @mouseup="unSelect">
    <h1>预览</h1>
    <n-button @click="generate">生成</n-button>
    <div class="preview" ref="bqb">
      <div v-for="(con) in temp.bqbContents"
           @mousedown="(e)=>{select(e,con)}"
           class="floatItem"
           :style="{
            left:con.position.x+'px',
            top:con.position.y+'px'
      }">
        <template v-if="con.type==='TEXT'">{{ con.text }}</template>
        <img :src="con.url" v-else/>
      </div>
      <img :src="temp.background">
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, ref, watch, onMounted} from "vue";
import {Bqb, BqbContent, Position} from "@/types/bqb";
import {useRoute} from 'vue-router'
import {useMouse} from "@/utils/mouse";
import html2canvas from 'html2canvas';
import fileSaver from 'file-saver'

export default {
  name: "preview",
  setup() {
    const route = useRoute()
    const bqb = ref()
    const {mousePosition} = useMouse()
    let currentContent: any = null
    const startPosition = reactive(new Position())
    const temp = reactive(JSON.parse(route.params.json as any)) as Bqb
    const padding = reactive(new Position())
    const select = (e, content: BqbContent) => {
      padding.x = e.offsetX
      padding.y = e.offsetY
      startPosition.x = e.target.parentElement.offsetLeft
      startPosition.y = e.target.parentElement.offsetTop
      currentContent = content
    }
    watch(mousePosition, (position) => {
      if (currentContent) {
        currentContent.position.x = position.x - startPosition.x - padding.x
        currentContent.position.y = position.y - startPosition.y - padding.y
      }
    })
    const unSelect = () => {
      currentContent = null
    }

    const exportCanvasAsPNG = (canvasElement: HTMLCanvasElement, fileName: string) => {
      const MIME_TYPE = "image/png";
      const imgURL = canvasElement.toDataURL(MIME_TYPE);
      const dlLink = document.createElement('a');
      dlLink.download = fileName;
      dlLink.href = imgURL;
      dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    }
    const generate = async () => {
      html2canvas(bqb.value).then(function(canvas) {
        exportCanvasAsPNG(canvas,temp.name)
      });
    }


    return {
      bqb,
      generate,
      temp,
      select,
      unSelect
    }
  }
}
</script>

<style scoped lang="less">
* {
  user-select: none;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.floatItem {
  position: absolute;
  border: 2px solid red;
  font-size: 20px;
  user-select: none;
  min-width: 40px;
  height: 32px;
  line-height: 32px;
  padding: 0 4px
}

.preview {
  position: relative;
}
</style>