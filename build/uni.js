process.env.MODE = 'UNI';

const { copy, remove } = require('fs-extra');
const { resolve } = require('path');
const buildPackageScript = require('./package');
const buildStyle = require('./style');
const buildLocale = require('./locale');
const { SRC_DIR, LIB_DIR } = require('./const');

const copySourceCode = async () => {
  const dirs = ['styles', 'types', 'README.md', { src: 'uni.package.json', dest: 'package.json' }];

  return Promise.all(
    dirs.map((dir) => {
      if (typeof dir === 'object') {
        return copy(resolve(SRC_DIR, dir.src), resolve(LIB_DIR, dir.dest));
      }

      return copy(resolve(SRC_DIR, dir), resolve(LIB_DIR, dir));
    })
  );
};

const clean = async () => {
  await Promise.all([remove(LIB_DIR)]);
};

const tasks = [
  {
    text: '复制源代码',
    task: copySourceCode,
  },
  {
    text: '构建样式',
    task: buildStyle,
  },
  {
    text: '构建组件',
    task: buildPackageScript,
  },
  {
    text: '构建多语言包',
    task: buildLocale,
  },
];

const runBuildTasks = async () => {
  for (let i = 0; i < tasks.length; i++) {
    const { task, text } = tasks[i];

    try {
      console.log(text);
      await task();
    } catch (err) {
      console.error(text);
      throw err;
    }
  }

  console.log('构建成功');
};

const build = async () => {
  process.env.NODE_ENV = 'production';
  try {
    await clean();
    await runBuildTasks();
  } catch (err) {
    console.error('构建失败', err);
    process.exit(1);
  }
};

build();