import * as dat from "dat.gui";

class MyGui {
  constructor(params: any) {
    let gui = new dat.GUI({ name: "my gui" });
    gui.add(params, "num", [0, 1, 2, 3]);

    // gui.addColor(params, "color1");
    // gui.addColor(params, "color2");
    // gui.add(params, "hoge");
    // gui.add(params, "age", 0, 100).onChange(() => {
    //   console.log(params.age);
    // });
    // gui.add(params, "age", [0, 100]).onFinishChange(() => {
    //   console.log(params.age);
    // });
    // gui.add(params, "isBox");
    // gui.add(params, "get");

    // let params = {
    //   color1: "#FF0000",
    //   color2: [0, 128, 255],
    //   hoge: "hoge",
    //   age: 30,
    //   isBox: true,
    //   get: () => {
    //     console.log("aa");
    //   },
    // };
  }
}

export default MyGui;
