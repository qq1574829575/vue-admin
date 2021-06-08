const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userinfo: state => state.user.userinfo,
  hasRoutes: state => state.user.hasRoutes,
  adminUserInfo: state => state.user.adminUserInfo,
  permissionRoutesInfo: state => state.user.permissionRoutesInfo,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
