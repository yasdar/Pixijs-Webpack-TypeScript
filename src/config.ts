export  const GameCanvas:any ={
    width:window.innerWidth,
    height:window.innerHeight,
    backgroundColor: 0x333333
}
export const TotalCard:number = 144;

export const MixObject:any =[
    ["#apple","this is an apple"],
    ["#apple","this is an apple and banana","#banana"],
    ["#apple","#banana","#orange","3 fruits!"],
    ["#apple","#banana","#orange","#strawberry"],
    ["text1","text2","text3","text4","tex5"],
    ["this is an apple","#apple", "and a banana","#banana"],
    ["tomato","#tomato","#apple","#banana","#orange",": fruits!"],
    ["#bottle","#banana","#orange","#bottle"],
    // and others here ...
    //Schema : an image must start with # ,be sure the image was loaded with assets const
];
export const MixObjectOptions:any ={
    DefaultIconHeight : 48,
    MaxFontSize : 36,
    MinFontSize : 14
}

export const assets= {
    images: [
        {
            key: 'flame',
            src: 'assets/images/flame.png',
        },
        {
            key: 'AC',
            src: 'assets/images/AC.png',
        },
        {
            key: 'bt1',
            src: 'assets/images/bt1.png',
        },
        {
            key: 'bt2',
            src: 'assets/images/bt2.png',
        },
        {
            key: 'bt3',
            src: 'assets/images/bt3.png',
        },
        {
            key: 'apple',
            src: 'assets/images/apple.png',
        },
        {
            key: 'banana',
            src: 'assets/images/banana.png',
        },
        {
            key: 'bottle',
            src: 'assets/images/bottle.png',
        },
        {
            key: 'orange',
            src: 'assets/images/orange.png',
        },
        {
            key: 'strawberry',
            src: 'assets/images/strawberry.png',
        },
        {
            key: 'tomato',
            src: 'assets/images/tomato.png',
        }
]
};