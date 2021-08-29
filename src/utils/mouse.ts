import {reactive} from 'vue'
import {Position} from "@/types/bqb";
export const useMouse = ()=>{
    const position = reactive(new Position())
    window.onmousemove = (e)=>{
        position.x = e.pageX
        position.y = e.pageY
    }
    return {mousePosition:position}
}