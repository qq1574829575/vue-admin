export const asyncRoutes = [
  {
    name: 'Permission',
    path: '/permission',
    component: '@/layout',
    alwaysShow: true,
    redirect: 'noRedirect', // 在面包屑中不可点击
    meta: {
      title: '权限管理',
      icon: 'lock'
    },
    children: [
      {
        name: 'PermissionRoutes',
        path: 'PermissionRoutes',
        component: 'permission/PermissionRoutes',
        meta: { title: '权限路由', icon: 'lock', noCache: true }
      },
      {
        name: 'PermissionUsers',
        path: 'PermissionUsers',
        component: 'permission/PermissionUsers',
        meta: { title: '权限分配', icon: 'lock', noCache: true }
      }
    ]
  },
  {
    name: 'StudentAffairs',
    path: '/StudentAffairs',
    component: '@/layout',
    alwaysShow: true,
    redirect: 'noRedirect', // 在面包屑中不可点击
    meta: {
      title: '学工管理',
      icon: 'icon'
    },
    children: [
      {
        name: 'student',
        path: 'student',
        component: 'StudentAffairs/student',
        meta: { title: '学生管理', icon: 'icon', noCache: true }
      },
      {
        name: 'class',
        path: 'class',
        component: 'EduAdmin/class',
        meta: { title: '班级管理', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    name: 'Tuition',
    path: '/Tuition',
    component: '@/layout',
    alwaysShow: true,
    redirect: 'noRedirect', // 在面包屑中不可点击
    meta: {
      title: '学费管理',
      icon: 'money'
    },
    children: [
      {
        name: 'otherPayItemInfo',
        path: 'otherPayItemInfo',
        component: 'tuition/otherPayItemInfo/otherPayItemInfo',
        meta: {
          title: '专业缴费套餐',
          icon: ''
        }
      },
      {
        name: 'createClassPayItem',
        path: 'createClassPayItem',
        component: 'tuition/createClassPayItem/createClassPayItem',
        meta: {
          title: '创建专业缴费项',
          icon: ''
        }
      },
      {
        name: 'studentPayInfo',
        path: 'studentPayInfo',
        component: 'tuition/studentPayInfo/studentPayInfo',
        meta: {
          title: '学生缴费详情',
          icon: ''
        }
      },
      {
        name: 'studentPayStatus',
        path: 'studentPayStatus',
        component: 'tuition/studentPayStatus/studentPayStatus',
        meta: {
          title: '学生缴费统计',
          icon: ''
        }
      }
    ]
  },
  {
    name: 'EduAdmin',
    path: '/EduAdmin',
    component: '@/layout',
    alwaysShow: true,
    redirect: 'noRedirect', // 在面包屑中不可点击
    meta: {
      title: '教务系统',
      icon: 'education'
    },
    children: [
      {
        name: 'major',
        path: 'major',
        component: 'EduAdmin/major',
        meta: { title: '专业管理', icon: 'icon', noCache: true }
      },
      {
        name: 'achievement',
        path: 'achievement',
        component: 'EduAdmin/achievement',
        meta: { title: '成绩管理', icon: 'icon', noCache: true }
      },
      {
        name: 'course',
        path: 'course',
        component: 'EduAdmin/course',
        meta: { title: '科目管理', icon: 'icon', noCache: true }
      },
      {
        name: 'GraduationCertificate',
        path: 'GraduationCertificate',
        component: 'EduAdmin/GraduationCertificate/index',
        redirect: 'noRedirect', // 在面包屑中不可点击
        alwaysShow: true,
        meta: { title: '毕业证书', icon: 'icon', noCache: true },
        children: [
          // {
          //   name: 'GraCertTemplate',
          //   path: 'GraCertTemplate',
          //   component: 'EduAdmin/GraduationCertificate/GraCertTemplate',
          //   meta: { title: '毕业证书模板', icon: 'icon', noCache: true }
          // }
          {
            name: 'GraStudentsInfo',
            path: 'GraStudentsInfo',
            component: 'EduAdmin/GraduationCertificate/GraStudentsInfo',
            meta: { title: '毕业学生信息', icon: 'icon', noCache: true }
          }
        ]
      }
    ]
  },

  // 404页面必须放在最后
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
