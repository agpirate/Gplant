import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
import {useQuasar, useMeta } from "quasar";

// const $q = useQuasar()

  // Define your mixin-like functionality
  const useMetaMixin = () => {

        async function _setPageheader(_pageTitle){

            const metaData = {
                // sets document title
                title: _pageTitle,

                // optional; sets final title as "Index Page - My Website", useful for multiple level meta
                titleTemplate: (title) => `${title} - `,
                // JS tags
                icon:"/icons/qimage.png", 
                script: { },
              };


            return metaData
        }



        return {
            _setPageheader}

  }


  export default  useMetaMixin
