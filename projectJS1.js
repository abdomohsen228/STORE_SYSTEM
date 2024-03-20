let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let tmp;

//get totel

function getTotal(){
    if(price.value!='')//if price not null
    {
        //calc
        let result=(+price.value+ +ads.value+ +taxes.value)- +discount.value;
        //add total to total icon
        total.innerHTML=result;
        //change this color
        total.style.background='#040';
    }else
    {
        total.innerHTML='';
        total.style.background='#a00d02';
    }
}

// create data



// creating array in this way save list always 
let dataPro;
if(localStorage.proudct!=null)
{
    dataPro=JSON.parse(localStorage.proudct);
}else{
    dataPro=[];
}
submit.onclick=function(){
    //object
    let newPro ={
        title :title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count:count.value,
        category: category.value.toLowerCase(),
    };
    if(title.value!='' && price!='' && category.value!='' && newPro.count>0 && newPro.count<100 ){
        if(mood=='create')
        {
            if(newPro.count>1)
            {
                for(let i=0;i<newPro.count;i++)
                {
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp]=newPro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';
        }
        clearData();

    }

    //save local storage
    localStorage.setItem('proudct', JSON.stringify(dataPro));
    showData();
}


// clear inputs

function clearData()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    count.value='';
    category.value='';
    discount.value='';
    total.innerHTML='';
}



// visual data on screen

function showData()
{
    getTotal();
    let table='';
    for(let i=0;i<dataPro.length;i++)
    {
        table+=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateDate(${i})"  id="update">update</button></td>
            <td><button onclick="deleteItem(${i})"  id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete=document.getElementById('deleteAll')
    if(dataPro.length>0)
    {
        btnDelete.innerHTML=`
            <button onclick="deleteAll">Clear(${dataPro.length})</button>`;
    }else{
        btnDelete.innerHTML=``;
    }
}
showData();


//delete item
function deleteItem(i)
{
    dataPro.splice(i,1);
    //update local storage
    localStorage.proudct=JSON.stringify(dataPro);
    showData();
}

// dalete all
function deleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// update

function updateDate(i)
{
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    discount.value=dataPro[i].discount;
    getTotal();
    category.value=dataPro[i].category;
    count.style.display='none';
    submit.innerHTML='update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior: 'smooth',
    })
}


//search importantttttt
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');

    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+searchMood; // Corrected to lowercase placeholder
    search.focus();
    search.value='';
    showData();
}
function searchDate(value)
{
    let table='';
    // get val from inputing
    for(let i=0;i<dataPro.length;i++)
    {
        let obj=`
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateDate(${i})"  id="update">update</button></td>
        <td><button onclick="deleteItem(${i})"  id="delete">delete</button></td>
    </tr>
    `;
        if(searchMood=='title')
        {
            if(dataPro[i].title.includes(value.toLowerCase()))
            {
                {
                    table+=obj;
                }
            }
        }   
        else{
            if(dataPro[i].category.includes(value.toLowerCase()))
            {
                {
                    table+=obj;
                }
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}
