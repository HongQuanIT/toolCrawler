/**
 * @author DangHongQuan
 * @param
 * @description Khai bao cac bien toan cuc
 */
$(document).ready(function () {
    console.log("Wellcome to Harrods tool !");
    Consumer_Key = "ck_ae372c7c5eb7e8ccce4d3e5ffcae4145e06dcf20";
    Consumer_Secret = "cs_21992da0075654988f651af692d6eeaeddef7dac";
    _username = "admin";
    _password = "4ULq a3Ks 5Ilq jExe LJQK gtYY";
    url_tagert = "https://uat-tool.mghn.vn/";
    url_source = "https://www.harrods.com/";
    lange_currency = "en-gb/";
    url_source = url_source + lange_currency;
});

$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		login();	
	}
});
function subStrAfterChars(str, char, pos)
{
  if(pos=='b')
   return str.substring(str.indexOf(char) + 1);
  else if(pos=='a') 
   return str.substring(0, str.indexOf(char));
  else
  return str;  
}
/**
 * @author DangHongQuan
 * @param
 * @description Dang nhap vao tool
 */
function login() {
    var username = $("input[name='username']").val();
    var password = $("input[name='password']").val();
    if (username == "mghn_admin" && password == "3W*7csA!") {
        $(".loading-l").css("display","block");
        setTimeout(function(){
            Get_brand();
            Get_category();
            Get_women()
            $(".form-login").css("display","none");
            $(".logined").css("display","block");
            $("body").css("background","none");
        }, 2000);
    } else if(username =="" || password == ""){
        alert("Có lỗi. Trường nhập không được bỏ trống !");
    } else{
        alert("Sai username hoặc password !");
    }
}
function hierarchySortFunc(a,b ) {
    return a.name > b.name;
  }
  
function hierarhySort(hashArr, key, result) {
  
    if (hashArr[key] == undefined) return;
    var arr = hashArr[key].sort(hierarchySortFunc);
    for (var i=0; i<arr.length; i++) {
      result.push(arr[i]);
      hierarhySort(hashArr, arr[i].id, result);
    }
  
    return result;
  }
/**
 * @author DangHongQuan
 * @param
 * @description Lay danh sach category cua mghn
 */
function Get_category() {
    fetch(url_tagert+"wp-json/wc/v3/products/categories?page=1&per_page=100", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Basic " + btoa(Consumer_Key + ":" + Consumer_Secret),

          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then(response => response.json())
        .then(res => {
            console.log(res);

            var arr = res;
          
            var hashArr = {};
            for (var i=0; i<arr.length; i++) {
                  if (hashArr[arr[i].parent] == undefined) hashArr[arr[i].parent] = [];
                  hashArr[arr[i].parent].push(arr[i]);
            }
            var result = hierarhySort(hashArr, 0, []);
            var vitri_women = 1000 ;
            for (var i=0; i<result.length; i++) {
                
                if (result[i].id==15) {
                    vitri_women=i;
                }
                if (vitri_women<i) {
                  if (result[i].parent==43 || result[i].parent==15) {
                      $("#select-category").append(`<option value="`+result[i].id+`" data-cat='[{"id":15},{"id":`+result[i].id+`}]'>__`+result[i].name+`</option>`);
                    }else if(result[i].parent==0){
                      $("#select-category").append(`<option value="`+result[i].id+`" data-cat='[{"id":`+result[i].id+`}]'>`+result[i].name+`</option>`);
                    }else{
                      $("#select-category").append(`<option value="`+result[i].id+`" data-cat='[{"id":15},{"id":`+result[i].parent+`},{"id":`+result[i].id+`}]'>_____`+result[i].name+`</option>`);
                    }
                }else{
                    if (result[i].parent==43 || result[i].parent==15) {
                      $("#select-category").append(`<option value="`+result[i].id+`" data-cat='[{"id":43},{"id":`+result[i].id+`}]'>__`+result[i].name+`</option>`);
                    }else if(result[i].parent==0){
                      $("#select-category").append(`<option value="`+result[i].id+`" data-cat='[{"id":`+result[i].id+`}]'>`+result[i].name+`</option>`);
                    }else{
                      $("#select-category").append(`<option value="`+result[i].id+`" data-cat='[{"id":43},{"id":`+result[i].parent+`},{"id":`+result[i].id+`}]'>_____`+result[i].name+`</option>`);
                    }
                }
                
               
            }
        });
}
/**
 * @author DangHongQuan
 * @param
 * @description Lay danh sach thuong hieu (brand)
 */
function Get_brand() {
    fetch(url_tagert+"wp-json/wc/v3/brands", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Basic " + btoa(Consumer_Key + ":" + Consumer_Secret),

          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          for (let i = 0; i < res.length; i++) {
              $("#select-brand").append(`<option value="`+res[i].term_id+`">`+res[i].name+`</option>`);
          }
        });
}
/**
 * @author DangHongQuan
 * @param
 * @description Lay category cua Shoes(harrods)
 */
function Shoes() {
    $('.scrollmenu span').each(function(){
        if ($('.scrollmenu span').hasClass("actived")) {
            $(this).removeClass('actived');
        }
    });
    $('.scrollmenu span:nth-child(6)').addClass("actived");
    $(".check-all").html("");
    $(".pagination").html("");
    $(".pagination-page").html("");
    $(".check-all").html();
    $.get(url_source+"shoes").done(function (data) {
            $(".loading-q").css("display", "block");
            $("#result").html("<div class='subcategory container'></div>");
            setTimeout(function(){
                $(".loading-q").css("display", "none");
                var source = $($.parseHTML(data));
                var arr = source.find(".hrd-link-list_link");
                for (let i = 0; i < arr.length; i++) {
                    console.log('name: '+arr[i].innerText +"\n Link : "+arr[i].href);
                    $(".subcategory").append(`<div class="col-md-4 cat" style=""><div class="sub_category_item" data-link="`+arr[i].href+`" onclick="sub_category_click(this);">`+arr[i].innerText+`</div><a style="float:right;" target="_blank" rel="noopener noreferrer" href="`+arr[i].href+`">`+`link`+`</a></div>`);
                }
            }, 500);
    },"json");
}
/**
 * @author DangHongQuan
 * @param
 * @description Lay category cua Children(harrods)
 */
function Children() {
    $('.scrollmenu span').each(function(){
        if ($('.scrollmenu span').hasClass("actived")) {
            $(this).removeClass('actived');
        }
    });
    $('.scrollmenu span:nth-child(5)').addClass("actived");
    $(".check-all").html("");
    $(".pagination").html("");
    $(".pagination-page").html("");
    $(".check-all").html();
    $.get(url_source+"children").done(function (data) {
            $(".loading-q").css("display", "block");
            $("#result").html("<div class='subcategory container'></div>");
            setTimeout(function(){
                $(".loading-q").css("display", "none");
                var source = $($.parseHTML(data));
                var arr = source.find(".hrd-link-list_link");
                for (let i = 0; i < arr.length; i++) {
                    console.log('name: '+arr[i].innerText +"\n Link : "+arr[i].href);
                    $(".subcategory").append(`<div class="col-md-4 cat" style=""><div class="sub_category_item" data-link="`+arr[i].href+`" onclick="sub_category_click(this);">`+arr[i].innerText+`</div><a style="float:right;" target="_blank" rel="noopener noreferrer" href="`+arr[i].href+`">`+`link`+`</a></div>`);
                }
            }, 500);
    },"json");
}
/**
 * @author DangHongQuan
 * @param
 * @description Lay category cua Beauty(harrods)
 */
function Beauty() {
    $('.scrollmenu span').each(function(){
        if ($('.scrollmenu span').hasClass("actived")) {
            $(this).removeClass('actived');
        }
    });
    $('.scrollmenu span:nth-child(4)').addClass("actived");
    $(".check-all").html("");
    $(".pagination").html("");
    $(".pagination-page").html("");
    $(".check-all").html();
    $.get(url_source+"beauty").done(function (data) {
            $(".loading-q").css("display", "block");
            $("#result").html("<div class='subcategory container'></div>");
            setTimeout(function(){
                $(".loading-q").css("display", "none");
                var source = $($.parseHTML(data));
                var arr = source.find(".hrd-link-list_link");
                for (let i = 0; i < arr.length; i++) {
                    console.log('name: '+arr[i].innerText +"\n Link : "+arr[i].href);
                    $(".subcategory").append(`<div class="col-md-4 cat" style=""><div class="sub_category_item" data-link="`+arr[i].href+`" onclick="sub_category_click(this);">`+arr[i].innerText+`</div><a style="float:right;" target="_blank" rel="noopener noreferrer" href="`+arr[i].href+`">`+`link`+`</a></div>`);
                }
            }, 500);
    },"json");
}
/**
 * @author DangHongQuan
 * @param
 * @description Lay category cua Accessories(harrods)
 */
function Accessories() {
    $('.scrollmenu span').each(function(){
        if ($('.scrollmenu span').hasClass("actived")) {
            $(this).removeClass('actived');
        }
    });
    $('.scrollmenu span:nth-child(3)').addClass("actived");
    $(".check-all").html("");
    $(".pagination").html("");
    $(".pagination-page").html("");
    $(".check-all").html();
    $.get(url_source+"accessories").done(function (data) {
            $(".loading-q").css("display", "block");
            $("#result").html("<div class='subcategory container'></div>");
            setTimeout(function(){
                $(".loading-q").css("display", "none");
                var source = $($.parseHTML(data));
                var arr = source.find(".hrd-link-list_link");
                for (let i = 0; i < arr.length; i++) {
                    console.log('name: '+arr[i].innerText +"\n Link : "+arr[i].href);
                    $(".subcategory").append(`<div class="col-md-4 cat" style=""><div class="sub_category_item" data-link="`+arr[i].href+`" onclick="sub_category_click(this);">`+arr[i].innerText+`</div><a style="float:right;" target="_blank" rel="noopener noreferrer" href="`+arr[i].href+`">`+`link`+`</a></div>`);
                }
            }, 500);
    },"json");
}
/**
 * @author DangHongQuan
 * @param
 * @description Lay category cua women (harrods)
 */
function Get_women() {
    $('.scrollmenu span').each(function(){
        if ($('.scrollmenu span').hasClass("actived")) {
            $(this).removeClass('actived');
        }
    });
    $('.scrollmenu span:nth-child(1)').addClass("actived");
    $(".check-all").html("");
    $(".pagination").html("");
    $(".pagination-page").html("");
    $(".check-all").html();
    $.get(url_source+"women").done(function (data) {
            $(".loading-q").css("display", "block");
            $("#result").html("<div class='subcategory container'></div>");
            setTimeout(function(){
                $(".loading-q").css("display", "none");
                var source = $($.parseHTML(data));
                var arr = source.find(".hrd-link-list_link");
                for (let i = 0; i < arr.length; i++) {
                    console.log('name: '+arr[i].innerText +"\n Link : "+arr[i].href);
                    $(".subcategory").append(`<div class="col-md-4 cat" style=""><div class="sub_category_item" data-link="`+arr[i].href+`" onclick="sub_category_click(this);">`+arr[i].innerText+`</div><a style="float:right;" target="_blank" rel="noopener noreferrer" href="`+arr[i].href+`">`+`link`+`</a></div>`);
                }
            }, 500);
    },"json");
}
/**
 * @author DangHongQuan
 * @param
 * @description Lay category cua man (harrods)
 */
function Get_man() {
    $('.scrollmenu span').each(function(){
        if ($('.scrollmenu span').hasClass("actived")) {
            $(this).removeClass('actived');
        }
    });
    $('.scrollmenu span:nth-child(2)').addClass("actived");
    $(".check-all").html("");
    $(".pagination").html("");
    $(".pagination-page").html("");
    $(".check-all").html();
    $.get(url_source+"men").done(function (data) {
        $(".loading-q").css("display", "block");
        $("#result").html("<div class='subcategory container'></div>");
        setTimeout(function(){
            $(".loading-q").css("display", "none");
            var source = $($.parseHTML(data));
            var arr = source.find(".hrd-link-list_link");
            for (let i = 0; i < arr.length; i++) {
                console.log('name: '+arr[i].innerText +"\n Link : "+arr[i].href);
                $(".subcategory").append(`<div class="col-md-4 cat" style=""><div class="sub_category_item" data-link="`+arr[i].href+`" onclick="sub_category_click(this);">`+arr[i].innerText+`</div><a style="float:right;" target="_blank" rel="noopener noreferrer" href="`+arr[i].href+`">`+`link`+`</a></div>`);
            }
        }, 500);
    },"json");
}
function sub_category_click(dom){
    $(".pagination1").html("");
    $(".loading-q").css("display", "block");
    $("#result").html("<div class='container'><div class='row listproduct'></div></div>");
    link = $(dom).attr('data-link');
    //link_new = link+"?view=Product&list=Grid&viewAll=False&orderBy=Latest";
    $.get(link).done(function (data) {
        var source = $($.parseHTML(data));
        //console.log(source);
        $(".check-all").html(`  <label class="lb_checkbox_all">
                                    Check All<input type="checkbox" id="checkAll">
                                    <span class="checkmark"></span>
                                </label>`);
        $("#checkAll").click(function () {
            $('input:checkbox').not(this).prop('checked', this.checked);
        });
        var arr = source.find(".product-grid_item");
        var src_page_view = source.find(".plp-view-all");
        
        try {
            var total = src_page_view[0].attributes[4].value;
        } catch (error) {
            alert("Error code : "+error);
            $(".loading-q").css("display", "none");
        }
        var item_per_page =src_page_view[0].attributes[3].value;
        console.log(total,item_per_page);
        setTimeout(function(){
            $(".loading-q").css("display", "none");
            page_view_firt(item_per_page,total,link);
            //console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                try {
                    var item_atrr = $(arr[i]);
                    //show image------------------------------------------------------
                        //console.log(item_atrr.find(".product-card_images-item img"));
                    var data_img = item_atrr.find(".product-card_images-item img");
                    var img = data_img[0].attributes[2].nodeValue;
                    var img_item = img.replace("?dwn=520px:592px", "");
                        // console.log(img_item);
                    //show link product------------------------------------------------
                    var data_link = item_atrr.find(".product-card_image-link");
                    //console.log(data_link);
                    var link_pro=data_link[0].attributes.href.value;
                    //show result data product-----------------------------------------
                    var data= $.parseJSON(arr[i].childNodes[1].attributes['data-product'].nodeValue);
                    console.log(data);
                    var html =`
                        <div class="col-md-3" style="display:inline-block;margin-bottom:20px;">
                            <div class="card" style="height:100%">
                                <img class="card-img-top" src="`+img_item+`" >
                                <label class="lb_checkbox">
                                    <input type="checkbox" data-link="`+link_pro+`" name="product-item" onload="get_product_atrr(event);" id="check_item_`+i+`">
                                    <span class="checkmark"></span>
                                </label>
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 14px;font-weight: bold;margin-bottom: 0;">`+data.name+`</h5>
                                    <span style="font-size: 14px;">Giá : `+data.price+`&pound; --- `+data.brand+`</span>
                                </div>
                                <div class="card-footer">
                                    <a target="_blank" rel="noopener noreferrer" href="`+link_pro+`" class="btn btn-primary"><i class="fas fa-link"></i></a>
                                    <div data-link="`+link_pro+`" style="float:right;cursor: pointer;" class="btn btn-primary" onclick="get_product(this, event);"><i class="fa fa-upload"></i></div>
                                </div>
                            </div>
                        </div>
                    `;
                    $(".listproduct").append(html);

                } catch (error) {
                    continue;
                }
                
            };
        }, 1000);

    });
}
//load lan dau
function page_view_firt(item_per_page,total,link){
    page_size=5;
    curent_page = 1;
    pre =1;
    next =1;
    console.log("page_view");
    /////////////////////curent page
    
    if (parseInt(link.substr(-1))>=2) {
        curent_page=parseInt(link.substr(-1));
    }
    /////////////////////page size
    if ((total%item_per_page !=2) && (total%item_per_page<item_per_page/2)) {
        page_size= Math.round(total/item_per_page)+1;
    } else {
        page_size= Math.round(total/item_per_page);
    }
     $(".pagination-page").html(`Trang : <span id="page-id">`+curent_page+`</span>/<span id="total_page">`+page_size+`</span>`);
     $("#pagination_q").html("");
     for (let i = 0; i < page_size; i++) {
         $("#pagination_q").append(`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(i+1)+`" data-page="`+(i+1)+`" onclick="page_click(this);" class="page-link">`+(i+1)+`</span></li>`);
     }
    ////////////////////page size >5
    if (page_size>5) {
        if (curent_page==1) {
            var page_item_html=`<li class="page-item active"><span class="page-link">1</span></li>`;
            $(".pagination1").append(page_item_html);
            for (let i = 2; i <= 4; i++) {
                var page_item_html=`<li class="page-item"><span data-link="`+link+`?pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }

            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);
            var next_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=2" data-page="2" onclick="page_click(this);" class="page-link next">>></span></li>`;
            $(".pagination1").append(next_html);
        }else if(curent_page==page_size){
            console.log("current-page = page-size");
            var pre_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(page_size-1)+`" data-page="`+(page_size-1)+`" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);
            for (let i = page_size-3; i < page_size ; i++) {
                var page_item_html=`<li class="page-item"><span data-link="`+link+`?pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var page_item_html=`<li class="page-item active"><span class="page-link">`+page_size+`</span></li>`;
            $(".pagination1").append(page_item_html);
        }else if(curent_page==2){
            var pre_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            var page_item_html_pre=`<li class="page-item"><span data-link="`+link+`?pageNumber=`+1+`" data-page="`+1+`" onclick="page_click(this);" class="page-link">`+1+`</span></li>`;
            $(".pagination1").append(page_item_html_pre);
            var page_item_html=`<li class="page-item active"><span class="page-link">`+curent_page+`</span></li>`;
            $(".pagination1").append(page_item_html);
            for (let i = 3; i <= 4; i++) {
                    var page_item_html=`<li class="page-item"><span data-link="`+link+`?pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                    $(".pagination1").append(page_item_html);
            }
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);
            var next_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link next" href="#">>></span></li>`;
            $(".pagination1").append(next_html);
        }else if(curent_page==page_size-1){
            var pre_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);

            for (let i = curent_page-2; i <curent_page; i++) {
                var page_item_html=`<li class="page-item "><span data-link="`+link+`?pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var page_item_html=`<li class="page-item active"><span  class="page-link">`+curent_page+`</span></li>`;
            $(".pagination1").append(page_item_html);
            var page_item_html_next=`<li class="page-item "><span class="page-link">`+(curent_page+1)+`</span></li>`;
            $(".pagination1").append(page_item_html_next);

            var next_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link next" href="#">>></span></li>`;
            $(".pagination1").append(next_html);
        }else{
            var pre_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);

            var page_item_html_pre=`<li class="page-item "><span data-link="`+link+`?pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link">`+(curent_page-1)+`</span></li>`;
            $(".pagination1").append(page_item_html_pre);
            var page_item_html=`<li class="page-item active"><span class="page-link">`+curent_page+`</span></li>`;
            $(".pagination1").append(page_item_html);
            var page_item_html_next=`<li class="page-item "><span data-link="`+link+`?pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link">`+(curent_page+1)+`</span></li>`;
            $(".pagination1").append(page_item_html_next);

            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);
            var next_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link next">>></span></li>`;
            $(".pagination1").append(next_html);
        }
    } else {
        if (curent_page==1) {
            var page_item_html=`<li class="page-item active"><span class="page-link">1</span></li>`;
            $(".pagination1").append(page_item_html);
            for (let i = 2; i <= page_size; i++) {
                var page_item_html=`<li class="page-item"><span data-link="`+link+`?pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var next_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=2" data-page="2" onclick="page_click(this);" class="page-link next" >>></span></li>`;
            $(".pagination1").append(next_html);
        }else if(curent_page==page_size){
            console.log("current-page = page-size");
            var pre_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=`+(page_size-1)+`" data-page="`+(page_size-1)+`" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            for (let i = 1; i < page_size; i++) {
                var page_item_html=`<li class="page-item"><span class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var page_item_html=`<li class="page-item active"><span class="page-link">`+page_size+`</span></li>`;
            $(".pagination1").append(page_item_html);
        }else{
            var pre_html =`<li class="page-item"><span class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            for (let i = 1; i <= page_size; i++) {
               if (curent_page==i) {
                    var page_item_html=`<li class="page-item active"><span class="page-link">`+i+`</span></li>`;
                    $(".pagination1").append(page_item_html);
               } else {
                    var page_item_html=`<li class="page-item"><span class="page-link">`+i+`</span></li>`;
                    $(".pagination1").append(page_item_html);
               }
            }
            var next_html =`<li class="page-item"><span class="page-link next" href="#">>></span></li>`;
            $(".pagination1").append(next_html);
        }
    }
}
//load page
function page_view(item_per_page,total,page_link){
    page_size=5;
    curent_page = 1;
    pre =1;
    next =1;
    console.log("page_view");
    /////////////////////curent page
    
    curent_page=parseInt(subStrAfterChars(page_link,"=","b"));

    /////////////////////page size
    if ((total%item_per_page !=2) && (total%item_per_page<item_per_page/2)) {
        page_size= Math.round(total/item_per_page)+1;
    } else {
        page_size= Math.round(total/item_per_page);
    }
    console.log("page-size: "+page_size);
    var vitri = page_link.indexOf("pageNumber");
    var new_link = page_link.substr(0, vitri);
    $(".pagination-page").html(`Trang : <span id="page-id">`+curent_page+`</span>/<span id="total_page">`+page_size+`</span>`);
    ////////////////////page size >5
    if (page_size>5) {
        if (curent_page==1) {
            var page_item_html=`<li class="page-item active"><span class="page-link">1</span></li>`;
            $(".pagination1").append(page_item_html);
            for (let i = 2; i <= 4; i++) {
                var page_item_html=`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);
            var next_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=2" data-page="2" onclick="page_click(this);" class="page-link next">>></span></li>`;
            $(".pagination1").append(next_html);
        }else if(curent_page==page_size){
            console.log("current-page = page-size");
            var pre_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(page_size-1)+`" data-page="`+(page_size-1)+`" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);
            for (let i = page_size-3; i < page_size ; i++) {
                var page_item_html=`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var page_item_html=`<li class="page-item active"><span class="page-link">`+page_size+`</span></li>`;
            $(".pagination1").append(page_item_html);
        }else if(curent_page==2){
            var pre_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            var page_item_html_pre=`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+1+`" data-page="`+1+`" onclick="page_click(this);" class="page-link">`+1+`</span></li>`;
            $(".pagination1").append(page_item_html_pre);
            var page_item_html=`<li class="page-item active"><span class="page-link">`+curent_page+`</span></li>`;
            $(".pagination1").append(page_item_html);
            for (let i = 3; i <= 4; i++) {
                    var page_item_html=`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                    $(".pagination1").append(page_item_html);
            }
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);
            var next_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link next" href="#">>></span></li>`;
            $(".pagination1").append(next_html);
        }else if(curent_page==page_size-1){
            var pre_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);

            for (let i = curent_page-2; i <curent_page; i++) {
                var page_item_html=`<li class="page-item "><span data-link="`+new_link+`pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var page_item_html=`<li class="page-item active"><span  class="page-link">`+curent_page+`</span></li>`;
            $(".pagination1").append(page_item_html);
            var page_item_html_next=`<li class="page-item "><span class="page-link">`+(curent_page+1)+`</span></li>`;
            $(".pagination1").append(page_item_html_next);
            var next_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link next" href="#">>></span></li>`;
            $(".pagination1").append(next_html);
        }else{
            var pre_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);

            var page_item_html_pre=`<li class="page-item "><span data-link="`+new_link+`pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link">`+(curent_page-1)+`</span></li>`;
            $(".pagination1").append(page_item_html_pre);
            var page_item_html=`<li class="page-item active"><span class="page-link">`+curent_page+`</span></li>`;
            $(".pagination1").append(page_item_html);
            var page_item_html_next=`<li class="page-item "><span data-link="`+new_link+`pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link">`+(curent_page+1)+`</span></li>`;
            $(".pagination1").append(page_item_html_next);

            var more =`<li class="page-item"><span data-toggle="modal" data-target="#Modalpagination" class="page-link more">...</span></li>`;
            $(".pagination1").append(more);
            var next_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link next">>></span></li>`;
            $(".pagination1").append(next_html);
        }
    } else {
        if (curent_page==1) {
            var page_item_html=`<li class="page-item active"><span class="page-link">1</span></li>`;
            $(".pagination1").append(page_item_html);
            for (let i = 2; i <= page_size; i++) {
                var vitri = page_link.indexOf("pageNumber");
                var new_link = page_link.substr(0, vitri);
                var page_item_html=`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var next_html =`<li class="page-item"><span data-link="`+link+`?pageNumber=2" data-page="2" class="page-link next" href="#">>></span></li>`;
            $(".pagination1").append(next_html);
        }else if(curent_page==page_size){
            var vitri = page_link.indexOf("pageNumber");
            var new_link = page_link.substr(0, vitri);
            var pre_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(page_size-1)+`" data-page="`+(page_size-1)+`" onclick="page_click(this);" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            for (let i = 1; i < page_size; i++) {
                var vitri = page_link.indexOf("pageNumber");
                var new_link = page_link.substr(0, vitri);
                var page_item_html=`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                $(".pagination1").append(page_item_html);
            }
            var page_item_html=`<li class="page-item active"><span data-link="`+new_link+`pageNumber=`+(page_size)+`" data-page="`+(page_size)+`" onclick="page_click(this);" class="page-link">`+page_size+`</span></li>`;
            $(".pagination1").append(page_item_html);
        }else{
            var vitri = page_link.indexOf("pageNumber");
            var new_link = page_link.substr(0, vitri);
            var pre_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(curent_page-1)+`" data-page="`+(curent_page-1)+`" onclick="page_click(this);" class="page-link pree" ><<</span></li>`;
            $(".pagination1").append(pre_html);
            for (let i = 1; i <= page_size; i++) {
               if (curent_page==i) {
                    var page_item_html=`<li class="page-item active"><span data-link="`+new_link+`pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                    $(".pagination1").append(page_item_html);
               } else {
                    var page_item_html=`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+i+`" data-page="`+i+`" onclick="page_click(this);" class="page-link">`+i+`</span></li>`;
                    $(".pagination1").append(page_item_html);
               }
            }
            var next_html =`<li class="page-item"><span data-link="`+new_link+`pageNumber=`+(curent_page+1)+`" data-page="`+(curent_page+1)+`" onclick="page_click(this);" class="page-link next">>></span></li>`;
            $(".pagination1").append(next_html);
        }
    }
}
function page_click(dom) {
    $(".loading-q").css("display", "block");
    $(".pagination1").html("");
    
    link_page = $(dom).attr('data-link');
    data_page =$(dom).attr('data-page');
    $(".listproduct").html("");
    $.get(link_page).done(function (data) {
        var source = $($.parseHTML(data));
        $(".check-all").html(`  <label class="lb_checkbox_all">
                                    Check All<input type="checkbox" id="checkAll">
                                    <span class="checkmark"></span>
                                </label>`);
        $("#checkAll").click(function () {
            $('input:checkbox').not(this).prop('checked', this.checked);
        });

        //console.log(source);
        var arr = source.find(".product-grid_item");
        var src_page_view = source.find(".plp-view-all");
        var total = src_page_view[0].attributes[4].value;
        var item_per_page =src_page_view[0].attributes[3].value;
        console.log(total,item_per_page);
        setTimeout(function(){
            $(".loading-q").css("display", "none");
            page_view(item_per_page,total,link_page);
            //console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                try {
                    var item_atrr = $(arr[i]);
                    //show image------------------------------------------------------
                        //console.log(item_atrr.find(".product-card_images-item img"));
                    var data_img = item_atrr.find(".product-card_images-item img");
                    var img = data_img[0].attributes[2].nodeValue;
                    var img_item = img.replace("?dwn=520px:592px", "");
                        // console.log(img_item);
                    //show link product------------------------------------------------
                    var data_link = item_atrr.find(".product-card_image-link");
                    console.log(data_link);
                    var link_pro=data_link[0].attributes.href.value;
                    //show result data product-----------------------------------------
                    var data= $.parseJSON(arr[i].childNodes[1].attributes['data-product'].nodeValue);
                    var html =`
                        <div class="col-md-3" style="display:inline-block;margin-bottom:20px;">
                            <div class="card" style="height:100%">
                                <img class="card-img-top" src="`+img_item+`" alt="Card image cap">
                                <label class="lb_checkbox">
                                    <input type="checkbox" data-link="`+link_pro+`" name="product-item" onload="get_product_atrr(event);" id="check_item_`+i+`">
                                    <span class="checkmark"></span>
                                </label>
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 14px;font-weight: bold;margin-bottom: 0;">`+data.name+`</h5>
                                    <span style="font-size: 14px;">Giá : `+data.price+`&pound; --- `+data.brand+`</span>
                                </div>
                                <div class="card-footer">
                                    <a target="_blank" rel="noopener noreferrer" href="`+link_pro+`" class="btn btn-primary"><i class="fas fa-link"></i></a>
                                    <div data-link="`+link_pro+`" style="float:right; cursor: pointer;" class="btn btn-primary" onclick="get_product(this,event);"><i class="fa fa-upload"></i></div>
                                </div>
                            </div>
                        </div>
                    `;
                    $(".listproduct").append(html);
                } catch (error) {
                    continue;
                }
                
            };
        }, 1000);

    });
}
function get_image_fr_wp(src_img) {

    var jqXHR =$.ajax({
        url: url_tagert+"getimage.php", 
        method:"POST",
        crossDomain: 'true',
        async: false,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          },
        data: JSON.stringify(src_img),
        success: function(result){
         
        }
    });
    return jqXHR.responseText;
    fetch("https://localhost/mghn_03_10/getimage.php", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Basic " + btoa(Consumer_Key + ":" + Consumer_Secret),
        },
        body: JSON.stringify(src_img), // body data type must match "Content-Type" header
      })
        .then(response => response.json())
        .then(res => {
            console.log(res);
            return res;
        });
}
function delete_img(id) {
    $.ajax({
        url: url_tagert+"wp-json/wp/v2/media/"+id+"?force=true", 
        method:"DELETE",
        crossDomain: 'true',
        async: false,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Basic " + btoa(_username + ":" + _password),
          },
        success: function(result){
          console.log("delete image");
        }
    });
}
function variations(id,data_variations) {
    var jqXHR =$.ajax({
        url: url_tagert+"wp-json/wc/v3/products/"+id+"/variations", 
        method:"POST",
        crossDomain: 'true',
        async: false,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            "Authorization": "Basic " + btoa(Consumer_Key + ":" + Consumer_Secret)
          },
        data: JSON.stringify(data_variations),
        success: function(result){
        }
    });
    return jqXHR.responseText;
}
function get_product(dom, event) {
    var _url = $(dom).attr('data-link');
    data_product ={};//{"a":"ok","b":["oi","pl"]};
    $("#loadMe").modal("show");
    //loading-effect
    $("#loadMe .modal-body").html(` <div class="loader"></div>
                                    <div clas="loader-txt">
                                        <p>Đang tiến hành upload sản phẩm.Vui lòng chờ!... <br><br><small>Không thêm các action khác... #love</small></p>
                                    </div>`);
    // console.log(data);
    if (typeof _url===`undefined`) {
        $("#loadMe .modal-body").html(`<p>Đã xảy ra lỗi. Vui lòng thử lại sau!... <br><br><small style="color:red;">Error :`+_url+`. Không lấy được đường dẫn !</small><br><br><button style="border: 1px solid #a7a7d7;" type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>`);
        return;
    }
    
    $.ajax({
        url : _url,
        type : "GET",
        async: false,
        success : function(data) {
                var source = $($.parseHTML(data));
                //img
                var arr_img = source.find(".pdp_images-list li");
                var arr_img_product = [];
                var http="https:";
                for (let i = 0; i < arr_img.length; i++) {
                    try {
                        var item_atrr = $(arr_img[i]);
                        var data_img = item_atrr.find("img");
                        var img = data_img[0].attributes[2].nodeValue;
                        var img_item= http.concat(img.replace("?dwn=767px:873px",""));
                        var object_img = {"src":img_item};
                        console.log(object_img);
                        arr_img_product.push(object_img);
                    } catch (error) {
                        continue;
                    }
                }
                var images = arr_img_product; // atrr-woocommerce
                
                //id
                var id_product = source.find(".buying-controls_prodID");
                try {
                    var id_term = (id_product[0].innerText);
                } catch (error) {
                    //$("#loadMe").modal("hide");
                    $("#loadMe .modal-body").html(`<p>Detect error!... <br><br><small style="color:red;">`+error+`</small><br><br><button style="border: 1px solid #a7a7d7;" type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>`);
                    return;
                }
                var id = id_term.slice(3);
                console.log(id);
                // name, brand, category, price
                var exchange_rate = $("input[name=currency]").val();
                var discount = $("input[name=discount]").val();
                var src_data = source.find(".buying-controls--generalmerchandise");

                try {
                    var src_term = $.parseJSON(src_data[0].attributes[8].nodeValue);
                } catch (error) {
                    $("#loadMe .modal-body").html(`<p>Detect error!... <br><br><small style="color:red;">`+error+`</small><br><br><button style="border: 1px solid #a7a7d7;" type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>`);
                    return;
                }
                var name = src_term.name; // atrr-woocommerce
                var brand =$('#select-brand').val();//src_term.brand; // atrr-woocommerce - get brand in website target
                var category = JSON.parse($("#select-category option:selected").attr("data-cat"));//atrr-woocommerce    src_term.dimension5; 
                var price = src_term.price*exchange_rate; // atrr-woocommerce
                //description
                var src_description = source.find(".pdp_details .product-info_section-2 .product-info_content");
                var description = src_description[0].innerText;// atrr-woocommerce
                console.log(description);
                //detail
                var detail_src = source.find(".pdp_details .product-info_section-1 .product-info_list");
                var detail = detail_src[0].innerHTML;
                var short_description = detail; // atrr-woocommerce
                console.log(short_description);
                //size
                var arr_size = source.find(".buying-controls_select--size");
                console.log(arr_size);
                array_size = [];
                if (arr_size.length !=0) {
                    for (let i = 0; i < arr_size[0].childElementCount; i++) {
                        try {
                            var size_item = arr_size[0][i].innerHTML;
                            console.log(size_item);
                            array_size.push(size_item);
                        } catch (error) {
                            continue;
                        }
                    }
                }else{
                    console.log("Not option size");
                    array_size=["Not option size"];
                }
                
                //color
                var arr_color = source.find(".buying-controls_details .buying-controls_option--colour");
                color_item =""; 
                array_color = [];
                // console.log(arr_color);
                if (arr_color[0].children.length ==2) {
                    var array = arr_color[0].children[1];
                    for (let i = 0; i < array.childElementCount; i++) {
                        color_item = array[i].innerText;
                        console.log("%c Color array","color: red;")
                        console.log(color_item);
                        array_color.push(color_item);

                    }
                }else{
                    color_item= arr_color[0].children[1].innerText;
                    console.log("%c Color array","color: red;");
                    console.log(color_item);
                    array_color.push(color_item);
                }
                // images= [
                //           {
                //             "src": "https://i-thethao.vnecdn.net/2019/09/26/Screen-Shot-2019-09-26-at-3-37-1353-7083-1569488303.jpg",
                //           },
                //           {
                //             "src": "https://i-thethao.vnecdn.net/2019/09/26/untitled-1-1569497360-3594-1569497385.jpg",
                //           },
                //         ]
                var _status="publish";
                if (JSON.parse($('input[name=radio-group]:checked').val())==2) {
                    _status="draft";
                }
                var img_wp = get_image_fr_wp(images);
                console.log("img_wp: "+img_wp);
                try {
                    img_wp_parse= jQuery.parseJSON(img_wp);
                } catch(e) {
                    $("#loadMe .modal-body").html(`<p>Đã sảy ra lỗi.Vui lòng thử lại sau!... <br><br><small style="color:red;">`+e+`</small><br><br><button style="border: 1px solid #a7a7d7;" type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>`);
                    return;
                }
                var array_image =img_wp_parse.data;
                var attributes =[
                    {
                        "id": 2,
                        "position": 0,
                        "visible": true,
                        "variation": true,
                        "options": array_size
                    }
                ];

                data_product={
                              "status": _status,
                              "name":name,
                              "type":"variable",
                              "regular_price":price.toString(),
                              "sku": id,
                              "description":description,
                              "brands":brand,
                              "short_description":short_description,
                              "manage_stock": false,
                              "stock_quantity": null,
                              "stock_status": "instock",
                              "on_sale": true,
                              "categories":category,
                              "images":array_image};
                if (array_size[0]=="Not option size") {
                    console.log("Not size,");
                }else{
                    console.log("Has size,");
                    Object.assign(data_product,{"attributes":attributes});
                }
                console.log(data_product);
                $.ajax({
                    url : url_tagert+"wp-json/wc/v3/products",
                    method : "POST",
                    async: false,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Basic " + btoa(Consumer_Key + ":" + Consumer_Secret),
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                    data: JSON.stringify(data_product),
                    statusCode: {
                        400: function() {
                            console.log("lỗi 400");
                            for (let i = 0; i < array_image.length; i++) {
                                console.log(array_image[i].id);
                                delete_img(array_image[i].id);
                            }
                            $("#loadMe .modal-body").html(`<p>Đã sảy ra lỗi.Vui lòng thử lại sau!... <br><br><small style="color:red;">Không hợp lệ hoặc Sản phẩm đã tồn tại !</small><br><br><button style="border: 1px solid #a7a7d7;" type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>`);
                            return;
                        }
                    },
                    success : function(res) {
                        console.log("data" + JSON.stringify(res));
                        sale_price = ((100-discount)*price)/100;
                        if (discount>0) {
                            data_variations ={
                                "regular_price":price.toString(),
                                "sale_price": sale_price.toString(),
                                "on_sale": true,
                                "virtual": false,
                                "date_on_sale_from": null,
                                "date_on_sale_from_gmt": null,
                                "date_on_sale_to": null,
                                "date_on_sale_to_gmt": null,
                                "purchasable": true,
                                "tax_status": "taxable",
                                "tax_class": "",
                                "manage_stock": false,
                                "stock_quantity": null,
                                "stock_status": "instock",
                                "instock":true,
                                "backorders": "no",
                                "backorders_allowed": false,
                                "backordered": false,
                              };
                        }else{
                            data_variations ={
                                "regular_price":price.toString(),
                                "sale_price": "",
                                "on_sale": false,
                                "purchasable": true,
                                "tax_status": "taxable",
                                "tax_class": "",
                                "manage_stock": false,
                                "stock_quantity": null,
                                "stock_status": "instock",
                                "instock":true,
                                "backorders": "no",
                                "backorders_allowed": false,
                                "backordered": false,
                              };
                        }

                        var id= res.id;
                        console.log("id: "+id);
                        if (typeof id ==="undefined") {
                          $("#loadMe .modal-body").html(`<p>Đã sảy ra lỗi.Vui lòng thử lại sau!... <br><br><small style="color:red;">Không tạo được sản phẩm. #id is undefined.</small><br><br><button style="border: 1px solid #a7a7d7;" type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>`);
                            return;
                        }
                        var mess = variations(id,data_variations);
                        try {
                            var mess_parse = jQuery.parseJSON(mess);
                            console.log(mess_parse);
                          $("#loadMe .modal-body").html(`<p>Upload thành công !<br><br><button style="border: 1px solid #a7a7d7;" type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>`);
                        } catch(e) {
                              $("#loadMe .modal-body").html(`<p>Đã sảy ra lỗi.Vui lòng thử lại sau!... <br><br><small style="color:red;">`+e+`</small><br><br><button style="border: 1px solid #a7a7d7;" type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>`);
                        }
                    }});
        
        },
        error: function() {
           connectionError();
           $("#loadMe .modal-body").html(` <div class="loader"></div>
           <div clas="loader-txt">
               <p>Cảnh báo!... <br><br><small>Dữ liệu tạm thời không thể lấy được. Vui lòng thử lại sau.</small></p>
           </div>`);
        }
     });
}

function get_product_atrr(event) {
    var domElement =$(event.target);
    var url = domElement.attr('data-link');
    data_product ={};//{"a":"ok","b":["oi","pl"]};
    alert("ok");
    // console.log(data);
    $.get(url).done(function (data) {
        var source = $($.parseHTML(data));
        //img
        var arr_img = source.find(".pdp_images-list li");
        var arr_img_product = [];
        var http="https:";
        for (let i = 0; i < arr_img.length; i++) {
            try {
                var item_atrr = $(arr_img[i]);
                var data_img = item_atrr.find("img");
                var img = data_img[0].attributes[2].nodeValue;
                var img_item= http.concat(img.replace("?dwn=767px:873px",""));
                var object_img = {"src":img_item};
                console.log(object_img);
                arr_img_product.push(object_img);
            } catch (error) {
                continue;
            }
        }
        var images = arr_img_product; // atrr-woocommerce
        
        //id
        var id_product = source.find(".buying-controls_prodID");
        var id_term = (id_product[0].innerText);
        var id = id_term.slice(3);
        console.log(id);
        // name, brand, category, price
        var src_data = source.find(".buying-controls--generalmerchandise");
        var src_term = $.parseJSON(src_data[0].attributes[8].nodeValue);
        var name = src_term.name; // atrr-woocommerce
        var brand =src_term.brand; // atrr-woocommerce
        var category = src_term.dimension5; 
        var price = src_term.price; // atrr-woocommerce
        //description
        var src_description = source.find(".pdp_details .product-info_section-2 .product-info_content");
        var description = src_description[0].innerText;// atrr-woocommerce
        console.log(description);
        //detail
        var detail_src = source.find(".pdp_details .product-info_section-1 .product-info_list");
        var detail = detail_src[0].innerHTML;
        var short_description = detail; // atrr-woocommerce
        console.log(short_description);
        //size
        var arr_size = source.find(".buying-controls_select--size");
        console.log(arr_size);
        if (arr_size.length !=0) {
            for (let i = 0; i < arr_size[0].childElementCount; i++) {
                try {
                    var size_item = arr_size[0][i].innerHTML;
                    console.log(size_item);
                } catch (error) {
                    continue;
                }
            }
        }else{
            console.log("Not option size");
        }
        
        //color
        var arr_color = source.find(".buying-controls_details .buying-controls_option--colour");
        color_item =""; 
        // console.log(arr_color);
        if (arr_color[0].children.length ==2) {
            var array = arr_color[0].children[1];
            for (let i = 0; i < array.childElementCount; i++) {
                color_item = array[i].innerText;
                console.log("%c Color array","color: red;");
                console.log(color_item);
            }
        }else{
            color_item= arr_color[0].children[1].innerText;
            console.log("%c Color array","color: red;")
            console.log(color_item);
        }
        data_product={"name":name,
                      "type":"simple",
                      "regular_price":price,
                      "description":description,
                      "short_desription":short_description,
                      "categories":[
                          {
                              "id":9,
                          },
                          {
                              "id":14
                          }
                      ],
                      "images":images};

    });
   
}
function check_category(params) {
    
}
function Upload_all(){
    var total_check = $("input[name='product-item']:checked").length;
    if (total_check<=0) {
        alert("Bạn chưa chọn sản phẩm ! Hãy chọn ít nhất 1 sản phẩm.");
        return;
    }
    if ($(".progress").hasClass("hide")) {
        $(".progress").removeClass("hide");
    }
    var item =0;
    var percent = 1;
    $(".__tong").html(total_check);
    $(".progress-bar-success").css("max-width",``+percent+`%`);
    $(".progress-bar-success").attr("aria-valuenow",percent);

    $.each($("input[name='product-item']:checked"), async function(){          
        console.log($(this).attr("id")+" ; ");
        await new Promise((resolve, reject)=>{
            get_product($(this),event);
            item = item +1;
            percent = (item*100)/total_check;
            $(".progress-bar-success").css("max-width",``+percent+`%`);
            $(".progress-bar-success").attr("aria-valuenow",percent);
            $(".__item").html(item);
            resolve();
        })
    });
}
function Upload(data_pro) {
    // data_pro = {
    //     "name": "sản phẩm từ tool",
    //     "type": "simple",
    //     "regular_price": "680000",
    //     "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
    //     "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    //     "categories": [
    //       {
    //         "id": 9
    //       },
    //       {
    //         "id": 14
    //       }
    //     ],
    //     "images": [
    //       {
    //         "src": "http://hinhnendepnhat.net/wp-content/uploads/2018/03/Hinh-dep-girl-xinh-nhay-mat-de-thuong-dang-yeu-nhat.jpg"
    //       },
    //       {
    //         "src": "http://hellohome.com.vn/upload/photos/2811131/zh7wvgt.jpg"
    //       },
    //     ]
    //   };
      console.log(JSON.stringify(data_pro));
      fetch(url_tagert+"wp-json/wc/v3/products", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Basic " + btoa(Consumer_Key + ":" + Consumer_Secret),

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data_pro), // body data type must match "Content-Type" header
      })
        .then(response => response.json())
        .then(res => {
          console.log("data" + JSON.stringify(res))
        });
    
}
// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'https://www.harrods.com/en-gb/women';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {
        var text = xhr.responseText;
        var title = getTitle(text);
        alert('Response from CORS request to ' + url + ': ' + title);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}
function Download_img(url) {
    fetch('http://images.harrods.com/product/off-white/diagonal-arrows-hoodie_000000006390505003.jpg')
    .then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
    //     a.download = 'todo-1.png';
        document.body.appendChild(a);
        a.click();
        console.log(url)
    })
    .catch(() => alert('oh no!'));
}