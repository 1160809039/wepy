import wepy from 'wepy'
import {selectDefault,selectAddress} from '../api/address'
import {saveTask,updateTask,getTaskById} from '../api/task'
import {OPENID,SCHOOL} from '../config/common'
import {SETADDRESS} from '../store/types/index'
export default class publishMixin extends wepy.mixin {
  
    data={
        address:'',
        addressId:0,
        taskName:'',
        taskWeight:'1',
        taskPrice:'1',
        taskAddr:'',
        consigneeName:'',
        consigneeMobile:'',
        id:''
      }
  methods = {
    toAdressList(){
        wepy.navigateTo({
          url:'/pages/address/list/list?type=change'
        })
     },
     taskNameInput(e){
        this.taskName=e.detail.value;
     },
      taskWeightInput(e){
         this.taskWeight=e.detail.value;
     },
      taskPriceInput(e){
        this.taskPrice=e.detail.value;
     },
      consigneeNameInput(e){
        this.consigneeName=e.detail.value;
     },
     taskAddrInput(e){
      this.taskAddr=e.detail.value;
     },
      consigneeMobileInput(e){
        this.consigneeMobile=e.detail.value;
     },
    async save(){
        
        let success=true;
        if(!this.taskName){
            
            this.methods.notify("快递名称不能为空")
            success= false;
           }
            if(!this.taskPrice){
                this.methods.notify("价格不能为空")
              success= false;
           }else{
               if(!(/^\d+\.?(\d+)?$/.test(this.taskPrice))){
                this.methods.notify("价格格式不正确")
                  success= false;
               }
           }
            if(!this.taskWeight){
                this.methods.notify("重量不能为空")
              success= false;
           }else{
               if(!(/^\d+\.?(\d+)?$/.test(this.taskWeight))){
                this.methods.notify("重量格式不正确")
                  success= false;
               }
           }
            if(!this.consigneeName){
                this.methods.notify("收货人不能为空")
              success= false;
           }

           if(!this.taskAddr){
            this.methods.notify("地址描述不能为空")
            success= false;
            }
            if(!this.consigneeMobile){
                this.methods.notify("收货人手机号不能为空")
              success= false;
           }else{
               if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.consigneeMobile))){
                this.methods.notify("手机号格式不正确")
                  success= false;
               }
           }
         
         if(success){
              let school=wepy.getStorageSync(SCHOOL);
               let openid=wepy.getStorageSync(OPENID);

                  let param={};
                  param.taskName=this.taskName;
                  param.taskWeight=this.taskWeight;
                  param.taskAddr=this.taskAddr;
                  param.taskPrice=this.taskPrice;
                  param.schoolId=school.id;
                  param.openid=openid;
                  param.addressId=this.addressId;
                  param.consigneeName=this.consigneeName;
                  param.consigneeMobile=this.consigneeMobile;
                 
                  if(this.id){
                    param.id=this.id;
                    let res=await updateTask(param);
                    console.log(res)
                    if(res.statusCode===200&&res.data.id){
                        wepy.navigateBack();
                    }else{
                      this.methods.notify("更改失败")
                    }
                    
                  }else{
                    let res=await saveTask(param);
              
                    if(res.statusCode===200&&res.data.id){
                       wepy.switchTab({
                         url:"/pages/index/index"
                       })
                    }else{
                      this.methods.notify("发布失败")
                    }
                  }

         }
     }
  }


  async onLoad(options){
    //清空以前可能选择过的addressid
   wepy.$store.dispatch({type:SETADDRESS,payload:0})
    

    let id=options.id;
    if(id){
       this.id=id;
    }
   
  
}

async onShow(){

 this.$apply();
let addressId=wepy.$store.getState().common.address;
if(addressId){
     let res=await selectAddress({id:addressId});
     if(res.statusCode===200&&res.data.id){
        this.address=res.data.specific_address;
        this.addressId=res.data.id;
         this.consigneeName=res.data.consignee_name;
        this.consigneeMobile=res.data.consignee_mobile;
        this.$apply();
     }
 }else{
    if(this.id){
         //显示选择后地址
        let res=await getTaskById({taskId:this.id});
   
       if(res.statusCode===200&&res.data.id){
        
            this.taskName=res.data.task_name;
            this.taskWeight=res.data.task_weight;
            this.taskAddr=res.data.task_addr;
            this.taskPrice=res.data.task_price;
            this.addressId=res.data.address_id;
            this.consigneeName=res.data.consignee_name;
             this.consigneeMobile=res.data.consignee_mobile;
            this.address=res.data.specific_address;
            this.$apply();
             
            console.log(this.taskAddr)
     }
    }else{
        //显示默认地址
         wepy.showLoading({
          title:'加载中',
            mask:true
             })
           let openid=wepy.getStorageSync(OPENID);
             let res=await selectDefault({openid:openid});
           if(res.statusCode===200&&res.data.id){
               this.address=res.data.specific_address;
               this.addressId=res.data.id;
               this.consigneeName=res.data.consignee_name;
               this.consigneeMobile=res.data.consignee_mobile;
               this.$apply();
               wepy.hideLoading()
               }else{
                  this.address='请选择'
              }
    }

 }

}


}
