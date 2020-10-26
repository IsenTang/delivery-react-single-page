
/* 四舍五入 */
// const round = number => Math.round(number * 100) / 100;

/* 计算reducer执行的时间 */
const monitorReducerEnhancer = createStore => (
   reducer,
   initialState,
   enhancer
) => {
   const monitoredReducer = (state, action) => {
      // const start = performance.now();
      const newState = reducer(state, action);
      // const end = performance.now();
      // const diff = round(end - start);
      // console.log('action type ==> ',action.type);
      // console.log('reducer process time:', diff);
      return newState;
   };
   return createStore(monitoredReducer, initialState, enhancer);
};

export default monitorReducerEnhancer;