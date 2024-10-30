# Earth-Monitor
web 监控SDK












## 打包知识点
### lint-staged 
用于让eslint仅对添加刀暂存区的文件校验，避免了不必要的每次提交时eslint全局校验

### tslint-config-prettier
让你的ts代码优雅规范
解决tslint和prettier兼容问题的配置模块

### build命令
`rollup -c rollup.config.js && typedoc --out docs --target es5 --theme minimal --mode file src`
-c指定配置参数
--out 指定输出文件目录
编译目标版本为es5
--theme指定文档主题 minimal

