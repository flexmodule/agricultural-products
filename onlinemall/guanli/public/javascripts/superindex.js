
 function Main(){
    this.init();
   }
  $.extend(Main.prototype,{
      init:function(){
          $.ajax({
              url:"/superindex/list",
          data:{
              limit:8,offset:0
          },
          success:(result)=>{
              this.renderlist(result.info);
              this.renderpage(result.total);
          }
          })
      },
      renderlist:function(list){
              for(var i=0;i<list.length;i++){
              $tr = $("<tr>").html(`
              <td>${list[i].author}</td>
              <td><a href="/detail?id=${list[i]._id}">${list[i].proname}</a></td>
              <td>${list[i].kindtype}</td>
              <td>${list[i].price}</td>
              <td>${list[i].num}</td>
              <td>${list[i].date}</td>
              <td>
              <a class="btn btn-default" href="/product/fixed?id=${list[i]._id}" role="button">修改</a>
              <a class="btn btn-danger" href="/product/delete?id=${list[i]._id}" role="button">删除</a>
              </td>
                  `);
  
              $("#mainbody").append($tr);
          }
      },
      renderpage:function(page){
          var _this =this;
          for(var i=0;i<page;i+=8){
              $li = $("<li class='totalpage'>").html(`<a>${i/8+1}</a>`);
              if($li.attr("class")=="totalpage"){
                 $li.click(function(){
                  _this.rerenderlist($(this).index());
              }) 
              }
              
              $(".pagination").append($li);
          }
      },
      rerenderlist:function(index){
          $("#mainbody").empty();
          $.ajax({
              url:"/superindex/list",
              data:{limit:8,offset:index*8},
              success:(result)=>{ // 箭头函数解决this 指向
                  this.renderlist(result.info);
              }
          })
      }
  
  })
  
  new Main();