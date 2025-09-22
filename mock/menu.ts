export default [
    {
        url: '/api/menu/list',
        method: 'get',
        timeout: 500,
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: [{"menuid":1,"menuname":"菜单1","menuurl":"/menu1"},{"menuid":2,"menuname":"菜单2","menuurl":"/menu2"},{"menuid":3,"menuname":"菜单3","menuurl":"/menu3"}]
      }
    }
  }
]