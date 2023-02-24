import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http:HttpClient) { }
  sendServer(postData:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    // let url = "https://laravelapi.erp1.cal4care.com/api/"+postData.api_url;
    let url = "https://erp1.cal4care.com/api/"+postData.api_url;
  
      let posting :any[]= postData;
        return this.http.post(url, posting,httpOptions);
         }
         sendServerpath(postData:any[]){
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
            
          };
        }
        postFile(postData:any){
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
          let url = "https://erp1.cal4care.com/api/"+postData.api_url;
        
            
            const formData: FormData = new FormData();
            
            formData.append('fileKey', postData, postData.name);
            let posting :any[]= postData;
              return this.http.post(url, posting,httpOptions);
               }
               sendServerpath1(postData:any[]){
                const httpOptions = {
                  headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                  })
                  
                };
              }
    

        pagination(list_info:any){
         
          var start,eu,next,back,limit,total_count,offset,last_val,last_final_val,current,pagination:any,btn_length;
          limit = list_info.page_limit;
          total_count = list_info.total;
          offset = list_info.offset;
          
          start = 0 + offset;
       
          eu = start-0;
          if(total_count<start+1 && total_count>1){
  
              eu = start-limit;
              start = eu;
             
          }
          current = eu + limit;
          back = eu - limit;
          next = eu + limit;
          last_val = Math.ceil(total_count/limit);
          last_final_val = (last_val-1)*limit;
          pagination = {"info":"hide"};
          if(total_count > limit){
              pagination.info = "show";
              pagination.start = 0;
  
              if(back >= 0){
                  pagination.back = back;
                  pagination.backtab = "show";
              }
              else{
                  pagination.backtab = "hide";
              }
          
              btn_length = 1;
              pagination.data = []
              for(var offset_count = 0;offset_count < total_count;offset_count=offset_count+limit){
  
                  if((offset_count<=eu+(2*limit)) && (offset_count>=eu-(2*limit))){
  
                      if(offset_count != eu){
                          pagination.data.push({"btn_length":btn_length,"offset_count":offset_count,"load":true});
                      }
                      else{
                          pagination.data.push({"btn_length":btn_length,"offset_count":offset_count,"load":false});
                      }
                  
                  }
                   btn_length=btn_length+1;
  
              }
              if(current < total_count){
                  pagination.next = next;
                  pagination.nexttab = "show";
              }
              else{
                  pagination.nexttab = "hide";
              }
              pagination.end = last_final_val;
  
          }
  
          return pagination;
      }
}
