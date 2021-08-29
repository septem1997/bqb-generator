import {Bqb, BqbContent, Position} from "@/types/bqb";
import {ref,reactive} from 'vue'
import hire from '@/assets/temp/hire.jpg'
export const useTempList = ()=>{
    const tempList = reactive(new Array<Bqb>())
    tempList.push({
        name:'你被录用了',
        background: hire,
        bqbContents:[
            BqbContent.build(new Position(123,89)),
            BqbContent.build(new Position(199,384)),
            BqbContent.build(new Position(97,536),"TEXT",'你被录用了'),
            BqbContent.build(new Position(145,777),'IMAGE'),
        ]
    } as Bqb)



    let selectedIndex = ref(0)
    const checkedTemp = (index:number)=>{
        selectedIndex.value = index
    }

    return{
        selectedIndex,
        checkedTemp,
        tempList
    }
}