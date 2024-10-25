
// import accetype from "src/hooks/accetype"
//profile-attendance-asset-rawmaterial-goods-supplier-customer-monpay-mispay-statment
//Data Tunneling Methods(b/n client and cient_app ..as of two way communications)
//1] query
//2] params
//3] url

//--------------- holding wall_Data of each routes (permissions and required queries and parametsr or other data)
//meta .......holds all rules and required_datas
const nul = [null, undefined, false, "", [], {}];

const routes = [
  {
    //Dashboard Pages....  //the routes params/meta key:value pair should be matching with income(to.meta.(key:values))
    path: "/dboards",
    component: () => import("layouts/DashboardLayout.vue"),
    
    children: [
      //----------------------
      { 
      path: "asset", component: () => import("pages/procurments/assetPage.vue"),
      meta: {
          _isauthenticated: true,
          //_accetype:accetype['asset'] ??'',
      },
      name:"asset",
     },
      { path: "attendance", component: () => import("pages/authenticated/attenPage.vue"),      
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['attendance'] ??'',
        
      },name:"attendance" },
      { path: "profile", component: () => import("pages/authenticated/empyPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['profile'] ??'',
        
    },name:"profile"},
    { path: "plan", component: () => import("pages/services/planPage.vue"),   
    meta: {
      _isauthenticated: true,
      //_accetype:accetype['plan'] ?? '',
     
    }, name:"plan" },
      { path: "report", component: () => import("pages/services/reportPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['report'] ??'',
      },
      name:"report"

     },
        { path: "leavereq", component: () => import("pages/services/leavereqPage.vue"),   
        meta: {
          _isauthenticated: true,
          //_accetype:accetype['leavereq']??'',
        },name:"leavereq" },
      { path: "mainten", component: () => import("pages/services/maintenPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['mainten']??,
    },
    name:"mainten" },
      //----------------
      { path: "supplier", component: () => import("pages/procurments/supplierPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['supplier'],
    },
    name:"supplier" },
      //-------------
      { path: "rawmaterial", component: () => import("pages/procurments/rawmaterialPage.vue"),  
       meta: {
        _isauthenticated: true,
        //_accetype:accetype['rawmaterial']??'',
    },name:"rawmaterial" },
      { path: "goods", component: () => import("pages/sales/goodsPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['goodss']??'',
    },name:"goods" },
      { path: "product", component: () => import("pages/sales/productPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['product']??'',
    }, name:"product"},
      //-------------------------------
      { path: "customer", component: () => import("pages/sales/customerPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['customer']??'',
    }, name:"customer"},
      { path: "monpay", component: () => import("pages/finances/monpayPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['monpay']??'',
    }, name:"monpay"},
      { path: "mispay", component: () => import("pages/finances/mispayPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['mispay']??'',
    },name:"mispay" },
      { path: "statment", component: () => import("pages/finances/statmentPage.vue"),   
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['statment']??'',
    },name:"statment" },
    ],
  },

    //HomePage.....Admin(root),Registerprofile & Blog_Page
  {
    path: "/user",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      { path: "root", 
      component: () => import("pages/authenticated/adminPage.vue"),
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['root']??'',
    } },

      /*
      { path: "blog", name:"blog",
      component: () => import("pages/authenticated/blogPage.vue"),
      meta: {
        _isauthenticated: true,
        //_accetype:accetype['profile']??'',
    } },
    */
     // { path: "", component: () => import("pages/IndexPage.vue") },
    ],
  },
      //Login_page -Below
  {
    path: "/",
    component: () => import("layouts/GuestLayout.vue"),
    children: [
      { path: "", name:"login",component: () => import("pages/GuestPage.vue"),
      meta: {
        _isauthenticated: false,
    } },

    ],
  },
  // Always leave this as last one,
  // but you can also remove it,
  {
    path: "/:catchAll(.*)*",
    //name:'errorPage',
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

/*

Hyadrations:

close_terminal when updating router+layout,
& use single layout in single_path(children)


use history---createhistory on index.....
*/
