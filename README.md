# Demo for pnpm monorepo

A simple monorepo demo supported by pnpm

## Packages

See structures in [`pnpm-workspace.yaml`](https://github.com/MadCcc/pnpm-monorepo-demo/blob/master/pnpm-workspace.yaml)

## 解决的问题

1. **跨项目编译问题**。一般来说一个项目只允许编译自己文件夹下的文件，但是在 monorepo 条件下会有很多"外部"包。有些 cli（比如项目中使用到的 nextjs）会提供类似的配置，如果没有的话可以通过 webpack 等的配置将 monorepo 内的包 include 进去
2. **集体发布时的编译优化**（未完成）。由于依赖提升的存在，我们应该很容易可以将一些公用的依赖提前编译好，防止重复编译占用资源和时间。
3. **配置提升**（未完成）。将比如 eslintrc/tsconfig 等配置文件提升，让各个 package 主动 extend 这些配置，实现配置的统一，有利于约束代码风格，也避免了重复配置这些文件。

## Demo

```bash
# dev
pnpm run dev:next-app
```

And you can see a simple page with a clock provided by [`@demo/clock`](https://github.com/MadCcc/pnpm-monorepo-demo/tree/master/components/clock)

## Q&A

### 为什么要用 Monorepo

举个例子，我们的 Layout 组件被三个项目共用，同时因为是一个业务组件，可能会跟着迭代进行开发。当我们有两个环境：dev 和 fat 时，这时候要求在 fat 上修改代码，我们至少会在两个分支上 commit 代码。
这时候为了保证 fat 不被 dev 影响，fat 我们需要发布一版 Layout，dev 我们也需要发布一版 Layout。同时用到 Layout的项目里，fat 和 dev 两个分支需要安装的 Layout 版本也不一样，这就造成了维护上的困难。

这个问题在 monorepo 里可以很好的解决，因为 monorepo 整体才会分dev和fat环境，对于子 repo 他们是没有自己的版本的，所以不存在需要发两次包，安装两次的困扰。
同时 monorepo 理论上可以优化构建，比如在集体发布的时候，我们可以先构建好每个项目都会用到的第三方包，如：react，react-dom 等，给各个子项目的构建结果使用，减少整体构建时间。
另外我们也可以更方便地抽离业务组件/业务模型，代码维护不再分隔到各个 repo 内，而是实现高度的复用。

### 为什么要使用 pnpm 而不是 lerna 或者 lerna + yarn

[关于现代包管理器的深度思考——为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://zhuanlan.zhihu.com/p/352437367)

下面是 pnpm 自己跑的 benchmark

![image](https://user-images.githubusercontent.com/27722486/144781648-7a18b503-0ed7-4caf-a95c-41eb3833b3e7.png)

另外 lerna + yarn 的 monorepo 方案学习成本比较高，不如 pnpm 来的方便

[为什么使用pnpm可以光速建立好用的monorepo（比yarn/lerna效率高）](https://blog.csdn.net/qq_21567385/article/details/118590143)

