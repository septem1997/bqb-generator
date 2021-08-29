<template>
  <div class="page">
    <h1>请选择模板</h1>
    <div class="tempList">
      <div v-for="(temp,index) in tempList"
           :class="{active:index===selectedIndex}"
           class="temp" @click="checkedTemp(index)" :key="temp.name">
        <img class="temp-img" :src="temp.background">
        <div class="temp-name">{{ temp.name }}</div>
      </div>
    </div>
    <n-button @click="modalVisible = true">确定</n-button>
    <n-modal v-model:show="modalVisible">
      <n-form
          :label-width="80"
      >
        <n-form-item :label="`文本${index+1}`" v-for="(content,index) in tempList[selectedIndex].bqbContents"
                     path="user.name">
          <template v-if="content.type==='TEXT'">
            <n-input v-model:value="content.text" placeholder="请输入文案"/>
          </template>
          <template v-else>
          </template>
        </n-form-item>
        <n-form-item>
          <n-button @click="preview">提交</n-button>
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
import {useTempList} from "@/views/templateChoose/tempList";
import {useRouter} from 'vue-router'

export default defineComponent({
  name: "templateChoose",
  setup() {
    const {tempList, checkedTemp, selectedIndex} = useTempList()
    const router = useRouter()
    const preview = function () {
      router.push({
        name: 'preview', params: {
          json: JSON.stringify(tempList[selectedIndex.value]) as any
        }
      })
    }

    return {
      checkedTemp,
      tempList,
      selectedIndex,
      modalVisible: ref(false),
      preview
    }
  }
})
</script>

<style scoped lang="less">
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.active {
  border: 1px solid blue
}

.tempList {
  display: flex;
}

.temp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-img {
    height: 200px;
    width: auto;
  }
}
</style>