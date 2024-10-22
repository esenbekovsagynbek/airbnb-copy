import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Настроить хранилище Redux',
  'Подключить Redux к React',
  'Создать срез <code>listings</code>',
  'Добавить срез <code>listings</code> в хранилище Redux',
  'Создать асинхронный thunk <code>fetchListings</code>',
  'Создать дополнительные редюсеры для <code>fetchListings</code>',
  'Рефакторить <code>HomePage</code> с использованием <code>listingsSlice</code>',
  'Настроить избранные объявления',
  'Создать компонент <code>ListingFavoritesPage</code>',
  'Создать компонент <code>Navbar</code>',
  'Добавить <code>Navbar</code> в <code>App</code>',
  'Обновить <code>Router</code>, чтобы разрешить навигацию к избранному',
  'Создать компонент <code>ListingFavoriteButton</code>',
  'Добавить <code>ListingFavoriteButton</code> в компонент <code>ListingCard</code>',
  'Добавить <code>ListingFavoriteButton</code> в компонент <code>ListingDetailsCard</code>',
];


export const Intro = () => {
  return (
    <div>
      <h2>Модуль 6 - Управление состоянием</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы настроим глобальное состояние в нашем приложении.
        Глобальное состояние означает состояние, доступное любому компоненту,
        независимо от его расположения в дереве компонентов. Это позволит нам
        делиться данными между компонентами, не передавая их через пропсы.
      </p>
      <p>
        Мы будем использовать популярную библиотеку Redux для этой цели, которая отлично подходит для
        написания масштабируемого управления состоянием. Мы будем использовать ее вместе с Redux Toolkit,
        который предоставляет множество функциональных возможностей «из коробки», чтобы мы могли сосредоточиться на том,
        что действительно важно: создании отличного приложения!
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        В данный момент все наши данные хранятся локально в состоянии наших компонентов. Например,
        <code>listings</code> в <code>HomePage</code> загружаются и хранятся в локальном состоянии
        <code>HomePage</code> через кастомный хук <code>useFetch</code>. То же самое справедливо и
        для компонента <code>ListingDetailsPage</code>.
      </p>
      <p>
        Нам нужно изменить это, потому что мы добавим новую функциональность в наше приложение.
        Мы добавим новую страницу «Избранное», которая будет отображать избранные объявления пользователя.
        Поскольку у нас будет несколько страниц, которые могут отображать одно и то же объявление,
        добавление объявления в избранное должно отражаться на любой странице, где это объявление находится.
        Это потребует от нас наличия глобального состояния.
      </p>
      <p>
        Нам нужно будет использовать Redux для хранения списков в глобальном состоянии,
        а затем сделать их доступными для любого компонента в нашем приложении. Это позволит
        нам затем обновить списки, которые добавлены в избранное пользователем, и динамически
        показывать их на странице «Избранное».
      </p>
      <p>
        Важно отметить, что мы будем обрабатывать все это только на стороне клиента.
        Поскольку у нас нет бэкенда, нет способа сохранить объявления в избранном.
        Вместо этого мы будем хранить это состояние в памяти и использовать его, чтобы показать,
        является ли объявление избранным или нет. Но как только мы обновим страницу, это состояние будет сброшено.
      </p>
      <p>
        Чтобы сделать все это, нам нужно будет настроить Redux, создать наше глобальное хранилище,
        а также создать редюсеры и действия, которые будут контролировать, как хранилище изменяется
        со временем. Затем мы изменим нашу загрузку данных, чтобы она выполнялась через Redux,
        а также создадим страницу «Избранное», чтобы пользователи могли добавлять любое объявление в избранное.
      </p>
      <h3>Задачи</h3>
      <Separator className='mb-2' />
      <ul>
        {tasks.map((task) => (
          <li key={task} dangerouslySetInnerHTML={{ __html: task }} />
        ))}
      </ul>
    </div>
  );
};

const storeCode = `import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});`;

export const Step1 = () => {
  return (
    <div>
      <h2>Настройка Redux хранилища</h2>
      <p>
        Первое, что нам нужно сделать, это настроить Redux хранилище.
        Redux хранилище является точкой входа в состояние Redux. Мы будем использовать
        его для доступа ко всем нашим индивидуальным редюсерам по всему приложению.
      </p>
      <p>
        Хранилище обычно состоит из нескольких редюсеров, каждый из которых представляет собой «кусочек» приложения,
        связанный с определенными функциями. Пока что, поскольку у нас еще нет созданных редюсеров, мы просто предоставим
        пустой объект. Нам нужно экспортировать это хранилище, так как мы будем использовать его на следующем этапе.
      </p>
      <p>
        Мы создадим новый файл в папке <code>src/state</code> с именем <code>store.js</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/state/store.js'>{storeCode}</CodeHighlighter>
    </div>
  );
};


const mainWithStoreCode = `import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';
import { store } from '@/state/store';

import Router from './Router';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <Router />
    </Provider>
  </ThemeProvider>,
);`;

export const Step2 = () => {
  return (
    <div>
      <h2>Подключение Redux к React</h2>
      <p>
        Теперь, когда у нас есть наше хранилище, нам нужно подключить его к React,
        поскольку наше React-приложение не может напрямую взаимодействовать с Redux.
        На самом деле, Redux вообще не требует React для работы; он полностью автономен!
        Чтобы получить доступ к хранилищу, нам нужно подключить его к нашему React-приложению
        через <code>Provider</code> из <code>react-redux</code>.
      </p>
      <p>
        <code>Provider</code> из <code>react-redux</code> работает через Context API от React.
        Мы можем обернуть наше приложение в этот компонент, как мы делаем с любым другим контекстом,
        и затем передать ему <code>store</code>, которое мы создали на предыдущем этапе. Это сделает наше
        <code>store</code> доступным из любого компонента в нашем приложении.
      </p>
      <p>
        Нам нужно будет обновить файл <code>main.jsx</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[2, 6, 17, 19]} title='src/main.jsx'>
        {mainWithStoreCode}
      </CodeHighlighter>
    </div>
  );
};


const listingsSliceCode = `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
});

export default listingsSlice.reducer;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Создание среза <code>listings</code>
      </h2>
      <p>
        Теперь, когда мы настроили наш хранилище, пора создать наш первый срез.
        В Redux срез — это набор редьюсеров, действий и селекторов, которые
        связаны с определенной частью нашего приложения. Каждый срез затем
        помещается в наше <code>store</code>, чтобы быть доступным в
        нашем приложении.
      </p>
      <p>
        В нашем случае мы в настоящее время заботимся только о{' '}
        <code>listings</code>. Нам нужно их получать, отображать, обрабатывать
        состояния ошибок и загрузки, и в конечном итоге позволять добавлять в
        избранное. Это значит, что наш первый срез будет срезом{' '}
        <code>listings</code>, который будет обрабатывать все это.
      </p>
      <p>
        Нам нужно определить <code>initialState</code>, а также наш срез,
        используя вспомогательную функцию <code>createSlice</code> из Redux
        toolkit. Сначала мы дадим ему имя "listings", чтобы обозначить наши{' '}
        <code>listings</code>, затем передадим наш <code>initialState</code>,
        а затем определим пустой объект для <code>reducers</code>, так как
        мы будем их создавать на следующих этапах. Наконец, мы экспортируем{' '}
        <code>listingsSlice.reducer</code>, чтобы использовать в нашем
        хранилище.
      </p>
      <p>
        Нам нужно создать новый файл внутри <code>src/state/listings</code>{' '}
        под названием <code>listingsSlice.js</code> с следующим кодом:
      </p>
      <CodeHighlighter title='src/state/listings/listingsSlice.js'>
        {listingsSliceCode}
      </CodeHighlighter>
    </div>
  );
};


const storeWithListingsSliceCode = `import { configureStore } from '@reduxjs/toolkit';

import listingsReducer from './listings/listingsSlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
});`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Добавление среза <code>listings</code> в Redux хранилище
      </h2>
      <p>
        Теперь, когда наш <code>listingsSlice</code> создан, нам нужно
        импортировать редьюсер, который мы экспортировали, и подключить его
        к нашему <code>store</code>. Это автоматически даст нашему React
        приложению доступ к этому срезу.
      </p>
      <p>
        Преимущество такого подхода заключается в том, что мы можем создать
        столько срезов, сколько захотим, и импортировать их сюда,
        чтобы объединить их в нашем хранилище. Это позволит нам иметь
        разделение обязанностей и эффективно организовать наше приложение
        по мере его роста, но в то же время иметь одну центральную точку
        для нашего Redux состояния, доступного из любой части
        нашего приложения.
      </p>
      <p>
        Нам нужно обновить файл <code>store.js</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[3, 7]} title='src/state/store.js'>
        {storeWithListingsSliceCode}
      </CodeHighlighter>
    </div>
  );
};


const listingsSliceWithAsyncThunkCode = `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export default listingsSlice.reducer;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Создание асинхронного thunk <code>fetchListings</code>
      </h2>
      <p>
        Следующий шаг — начать обрабатывать получение{' '}
        <code>listings</code> через Redux. Мы будем делать то же самое, что и
        раньше, с единственным отличием, что теперь мы будем использовать{' '}
        <code>listingsSlice</code> для хранения состояния и его обновления,
        вместо того чтобы хранить его локально в компоненте <code>HomePage</code>.
      </p>
      <p>
        Для этого нам нужно использовать <code>createAsyncThunk</code> из Redux,
        чтобы создать асинхронное действие. Мы дадим ему имя{' '}
        <code>listings/fetchListings</code>, чтобы обозначить срез и действие,
        а затем передадим ему асинхронную функцию, которая будет
        получать списки с того же конечного пункта, что и раньше. Нам также
        нужно будет сделать так, чтобы эта функция принимала необязательный
        параметр <code>options</code>, как это было в <code>useFetch</code>
        ранее, чтобы сохранить ту же функциональность фильтрации.
      </p>
      <p>
        Важно отметить, что поскольку мы используем{' '}
        <code>createAsyncThunk</code> из Redux Toolkit, нам не нужно
        явно обрабатывать состояния ошибки и загрузки внутри этой функции.
        Вместо этого мы обработаем их на следующем этапе, добавив некоторые
        редьюсеры.
      </p>
      <p>
        Нам нужно обновить файл <code>listingsSlice.js</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 17, 18, 19, 20, 21, 22, 23]}
        title='src/state/listings/listingsSlice.js'
      >
        {listingsSliceWithAsyncThunkCode}
      </CodeHighlighter>
    </div>
  );
};


const listingsSliceWithExtraReducersCode = `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import api from '@/api';

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }

        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export default listingsSlice.reducer;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Создание дополнительных редьюсеров для <code>fetchListings</code>
      </h2>
      <p>
        Наше асинхронное действие <code>fetchListings</code> теперь создано, но
        мы еще не определили, как наш срез должен на него реагировать. Нам нужно
        создать несколько редьюсеров, которые укажут Redux, что он должен делать
        в ответ на различные состояния <code>fetchListings</code>.
      </p>
      <p>
        Чтобы сохранить ту же функциональность, что и раньше, нам нужно
        сохранить полученные <code>listings</code> в состоянии, а также обработать
        состояния ошибки и загрузки. К счастью, большая часть этого
        автоматически обрабатывается Redux Toolkit. Поскольку мы используем{' '}
        <code>createAsyncThunk</code>, мы автоматически получаем доступ к{' '}
        <code>pending</code>, <code>fulfilled</code> и{' '}
        <code>rejected</code> состояниям.
      </p>
      <p>
        При работе с асинхронными функциями через <code>createAsyncThunk</code>{' '}
        нам нужно использовать свойство <code>extraReducers</code> из{' '}
        <code>createSlice</code>. Это позволит нам настроить ответ на каждое из
        этих состояний. Свойство <code>extraReducers</code> предоставляет нам
        <code>builder</code>, в который мы можем добавлять случаи.
      </p>
      <p>
        Каждый из этих случаев будет получать <code>state</code>, а также
        необязательное <code>action</code> с свойством <code>payload</code>,
        содержащим наши данные. Мы обновим свойство <code>status</code> во
        время получения, затем, если возникнет ошибка, установим ее в
        <code>rejected</code> состояние, иначе обновим{' '}
        <code>listings</code> данными из нашего API.
      </p>
      <p>
        Нам также нужно подготовить случай <code>fetchListings.rejected</code>,
        чтобы обработать отмену запроса. Поскольку мы будем перемещать наше
        получение данных из <code>useFetch</code> в Redux, нам нужно будет
        заново реализовать отмену запроса, чтобы предотвратить состояния гонки.
      </p>
      <p>
        Нам нужно обновить файл <code>listingsSlice.js</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
          33,
        ]}
        title='src/state/listings/listingsSlice.jsx'
      >
        {listingsSliceWithExtraReducersCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithFetchListingsDispatchCode = `import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { fetchListings } from '@/state/listings/listingsSlice';

const HomePage = () => {
  const { listings, error, status } = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  useEffect(() => {
    const request = dispatch(fetchListings(fetchOptions));

    return () => {
      request.abort();
    };
  }, [dispatch, fetchOptions]);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRenderer error={error} isLoading={status === 'loading'}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Рефакторинг <code>HomePage</code> с помощью <code>listingsSlice</code>
      </h2>
      <p>
        Теперь, когда наш срез готов с действиями и редюсерами, мы можем
        наконец начать использовать его в наших компонентах React. Мы начнем с
        рефакторинга <code>HomePage</code>, чтобы теперь получать <code>listings</code>{' '}
        с помощью нашего нового асинхронного действия, и мы получим состояние из Redux
        с помощью селектора.
      </p>
      <p>
        Чтобы получить любую часть состояния в Redux, вы используете селектор
        через <code>useSelector</code>. Селектор — это функция, которая принимает
        <code>state</code> и выбирает любую его подмножество. В нашем случае мы
        хотим получить доступ к <code>listingsSlice</code>, который будет находиться
        под <code>state.listings</code>. Передав этот селектор в{' '}
        <code>useSelector</code>, мы получим ту часть состояния, которая хранит наши{' '}
        <code>listings</code>, <code>error</code> и <code>status</code>{' '}
        состояния.
      </p>
      <p>
        Затем, чтобы отправлять действия в Redux, мы будем использовать функцию
        <code>dispatch</code>, возвращаемую из <code>useDispatch</code>. Мы сможем
        отправить действие <code>fetchListings</code> с его помощью, и Redux
        автоматически обработает обновление состояния за нас.
      </p>
      <p>
        Поскольку мы больше не используем пользовательский хук <code>useFetch</code>
        для этого запроса, нам нужно будет заново реализовать нашу логику для
        отмены запроса, если до его завершения будет сделан другой. К счастью,
        это легко сделать с Redux. Вызов <code>dispatch</code> вернет Promise,
        который имеет прикрепленную функцию <code>abort</code>, которую мы можем
        вызвать в функции очистки <code>useEffect</code>. Наш запрос теперь будет
        правильно обработан во время отмены с помощью кода, который мы настроили
        здесь и на предыдущем этапе.
      </p>
      <p>
        Стоит отметить, что с этими изменениями мы потеряли некоторые функции,
        которые добавили на предыдущих этапах. Мы потеряли кеширование, которое
        настроили в <code>useFetch</code>. К сожалению, Redux не упрощает
        реализацию собственного решения для кеширования, как мы сделали ранее, так
        что мы оставим это без изменений.
      </p>
      <p>
        Нам нужно обновить компонент <code>HomePage</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 8, 11, 12, 22, 23, 24, 25, 26, 27, 28, 40]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithFetchListingsDispatchCode}
      </CodeHighlighter>
    </div>
  );
};


const listingsSliceWithFavoritesCode = `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  listings: [],
  error: null,
  favoriteListingIds: [],
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavoriteListing: (state, action) => {
      state.favoriteListingIds.push(action.payload);
    },
    removeFavoriteListing: (state, action) => {
      state.favoriteListingIds = state.favoriteListingIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        const message = action.error.message;

        if (message !== 'Aborted') {
          state.status = 'failed';
          state.error = message;
        }
      });
  },
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export default listingsSlice.reducer;`;

export const Step8 = () => {
  return (
    <div>
      <h2>Настройка избранных объявлений</h2>
      <p>
        Следующий шаг для нас — снова добавить новую функциональность в наше
        приложение. Мы добавим возможность пользователям отмечать свои объявления
        как избранные и отображать их на отдельной странице. Мы будем использовать
        <code>listingsSlice</code> для хранения избранных объявлений, а также
        для управления действиями и редюсерами для добавления/удаления их.
      </p>
      <p>
        Первое, что нам нужно сделать, это добавить новое свойство{' '}
        <code>favoriteListingIds</code> в состояние <code>listingsSlice</code>.
        Оно будет хранить ID избранных объявлений пользователя. Мы будем использовать
        эти ID, чтобы проверить, является ли объявление избранным или нет.
      </p>
      <p>
        Затем нам нужно будет создать редюсеры для обработки добавления и удаления
        объявления из избранного. Это будут синхронные действия, поэтому нам не
        нужно будет использовать асинхронный thunk. Вместо этого мы определим два
        редюсера внутри объекта <code>reducers</code> нашего среза.
      </p>
      <p>
        Поскольку мы работаем с Redux Toolkit и используем{' '}
        <code>createSlice</code>, нам не нужно создавать соответствующие действия,
        как мы делали с асинхронным thunk. Вместо этого мы можем просто
        получить и экспортировать их через <code>listingsSlice.actions</code>.
      </p>
      <p>
        Нам нужно будет обновить <code>listingsSlice</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[8, 16, 17, 18, 19, 20, 21, 22, 23, 53, 54]}
        title='src/state/listings/listingsSlice.js'
      >
        {listingsSliceWithFavoritesCode}
      </CodeHighlighter>
    </div>
  );
};


const listingFavoritesPageCode = `import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ListingList from '@/components/ListingList';

const ListingFavoritesPage = () => {
  const { listings, favoriteListingIds } = useSelector(
    (state) => state.listings,
  );

  const favoriteListings = useMemo(
    () => listings.filter((listing) => favoriteListingIds.includes(listing.id)),
    [listings, favoriteListingIds],
  );

  return (
    <div className='container py-4'>
      <ListingList listings={favoriteListings} />
    </div>
  );
};

export default ListingFavoritesPage;
`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingFavoritesPage</code>
      </h2>
      <p>
        Теперь, когда мы настроили наш срез для работы с избранными объявлениями,
        мы можем приступить к созданию страницы для них. Это будет страница
        "Избранное", которая будет отвечать за получение избранных объявлений из{' '}
        <code>listingsSlice</code> и их отображение.
      </p>
      <p>
        Мы будем использовать хук <code>useSelector</code>, чтобы получить доступ к
        <code>state.listings</code>, что даст нам доступ к{' '}
        <code>favoriteListingIds</code> и <code>listings</code>. Нам понадобятся
        оба, чтобы отобразить все избранные объявления.
      </p>
      <p>
        Поскольку одна часть нашего состояния хранит избранные ID, а другая —
        объекты объявлений, нам нужно будет создать свой собственный массив{' '}
        <code>favoriteListings</code>, фильтруя все <code>listings</code> на
        предмет избранных. Мы обернем это в <code>useMemo</code>, чтобы
        предотвратить ненужные вычисления этого массива.
      </p>
      <p>
        Важно помнить, что никаких запросов здесь не будет. Функция избранных
        объявлений работает только на клиенте, поскольку бэкенда нет. Это
        означает, что мы не можем получить, какие объявления являются
        избранными. Вместо этого мы будем использовать уже полученные объявления
        на странице "Главная" и сравнивать их, чтобы увидеть, какие из них
        избранные, основываясь на состоянии Redux. Таким образом, нам не нужно
        обрабатывать состояния ошибок или загрузки. Это также означает, что наши
        избранные объявления будут сбрасываться каждый раз, когда мы обновляем
        страницу, поскольку ничего не сохраняется!
      </p>
      <p>
        Нам нужно будет создать новый файл внутри <code>src/pages</code> под
        названием <code>ListingFavoritesPage.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/pages/ListingFavoritesPage.jsx'>
        {listingFavoritesPageCode}
      </CodeHighlighter>
    </div>
  );
};


const navBarCode = `import { Link } from 'react-router-dom';

import { Separator } from '@/components/ui';

const Navbar = () => {
  return (
    <>
      <div className='flex flex-row justify-center gap-8 px-8 py-4'>
        <Link to='/'>Home</Link>
        <Link to='/favorites'>Favorites</Link>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>Navbar</code>
      </h2>
      <p>
        Теперь, когда мы создали страницу "Избранное", нам следует создать
        навигационную панель, чтобы легко к ней добираться. На данный момент нет
        очевидного места для ссылки на "Избранное", поэтому нам нужно создать
        такую ссылку.
      </p>
      <p>
        <code>Navbar</code> пока будет содержать только ссылку на "Главную" и
        ссылку на нашу новую страницу "Избранное". Позже мы добавим в нее больше
        элементов, так что это хорошая идея!
      </p>
      <p>
        Нам нужно будет создать новый файл внутри <code>src/components</code>{' '}
        под названием <code>Navbar.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/Navbar.jsx'>
        {navBarCode}
      </CodeHighlighter>
    </div>
  );
};


const appWithNavbarCode = `import { Outlet } from 'react-router-dom';

import Devbar from '@/components/Devbar/Devbar';
import Navbar from '@/components/Navbar';

const App = () => {
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default App;`;

export const Step11 = () => {
  return (
    <div>
      <h2>
        Добавление <code>Navbar</code> в <code>App</code>
      </h2>
      <p>
        Вы, вероятно, уже догадались, что следующий шаг — добавить компонент{' '}
        <code>Navbar</code> в наш компонент <code>App</code>. Это позволит
        нам видеть навигационную панель на каждой странице нашего приложения.
      </p>
      <p>
        Однако мы не хотим, чтобы <code>Navbar</code> перекрывал{' '}
        <code>Devbar</code>, поэтому мы добавим его сразу над компонентом{' '}
        <code>Outlet</code>, чтобы он находился в тех же стилях контейнера и
        не мешал левой части приложения.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>App</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[4, 13]} title='src/App.jsx'>
        {appWithNavbarCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithFavoritesCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';
import NotFoundPage from '@/pages/NotFoundPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
      {
        path: '/favorites',
        element: <ListingFavoritesPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step12 = () => {
  return (
    <div>
      <h2>
        Обновление <code>Router</code> для навигации к избранным
      </h2>
      <p>
        Последнее, что нам нужно сделать, это обновить наш <code>Router</code>,
        чтобы создать маршрут для страницы избранного. Это позволит навигации по{' '}
        <code>/favorites</code> работать и отобразить{' '}
        <code>ListingFavoritesPage</code>.
      </p>
      <p>
        Мы добавим <code>ListingFavoritesPage</code> прямо под{' '}
        <code>ListingDetailsPage</code>, чтобы все было аккуратно организовано,
        и она отображалась как дочерний элемент <code>App</code>.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>Router</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[5, 24, 25, 26, 27]}
        title='src/Router.jsx'
      >
        {routerWithFavoritesCode}
      </CodeHighlighter>
    </div>
  );
};


const listingFavoriteButtonCode = `import { Heart } from 'lucide-react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import {
  addFavoriteListing,
  removeFavoriteListing,
} from '@/state/listings/listingsSlice';

const ListingFavoriteButton = ({ className, listing }) => {
  const favoriteListingIds = useSelector(
    (state) => state.listings.favoriteListingIds,
  );
  const dispatch = useDispatch();

  const isFavorite = useMemo(
    () => favoriteListingIds.includes(listing.id),
    [listing, favoriteListingIds],
  );

  return (
    <Button
      className={className}
      variant='outline'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
          dispatch(removeFavoriteListing(listing.id));
        } else {
          dispatch(addFavoriteListing(listing.id));
        }
      }}
    >
      <Heart
        className={cn('h-4 w-4', { 'fill-primary text-primary': isFavorite })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;`;

export const Step13 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingFavoriteButton</code>
      </h2>
      <p>
        Теперь, когда наша <code>ListingFavoritesPage</code> создана и полностью
        функциональна, нам нужна возможность добавлять списки в избранное, чтобы
        они отображались на странице! Нам нужно создать кнопку, которая будет
        подключена к Redux и позволит добавлять список в избранное или удалять
        его из избранного.
      </p>
      <p>
        Поскольку это кнопка, которую мы будем использовать в нескольких
        местах, разумно сделать ее переиспользуемым компонентом. Поскольку у нас
        есть доступ к Redux из любого места в нашем приложении, также будет
        логично, чтобы этот компонент инкапсулировал всю логику, необходимую для
        добавления списка в избранное. Таким образом, мы сможем просто
        использовать его в любом месте, и он будет работать автоматически.
      </p>
      <p>
        Мы снова воспользуемся <code>useSelector</code> из Redux, чтобы получить
        массив <code>favoriteListingIds</code>. Затем мы сможем использовать его
        для сравнения с <code>listing.id</code>, который этот компонент получит
        из своих свойств, и определить, добавлен ли список в избранное или нет.
        Мы добавим функцию к обработчику события <code>onClick</code> кнопки,
        которая будет проверять, добавлен ли список в избранное, и вызывать
        соответствующее действие. Также нам нужно будет добавить{' '}
        <code>e.preventDefault()</code>, чтобы не мешать <code>Link</code>,
        который у нас есть в <code>ListingCard</code>.
      </p>
      <p>
        Нам нужно будет создать новый файл внутри <code>src/components</code>{' '}
        под названием <code>ListingFavoriteButton.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingFavoriteButton.jsx'>
        {listingFavoriteButtonCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardWithFavoriteButtonCode = `import { DollarSign, Pin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Link to={${'`/listings/${listing.id}`'}}>
      <Card className='w-[320px]'>
        <div className='relative'>
          <ListingCardImages listing={listing} />
          <ListingFavoriteButton
            listing={listing}
            className='absolute right-4 top-4'
          />
        </div>
        <CardContent className='flex flex-col gap-2 p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;`;

export const Step14 = () => {
  return (
    <div>
      <h2>
        Добавление <code>ListingFavoriteButton</code> в компонент{' '}
        <code>ListingCard</code>
      </h2>
      <p>
        Следующий шаг — добавить эту кнопку в компонент <code>ListingCard</code>
        . Это позволит пользователям легко добавлять список в избранное прямо с
        главной страницы, где отображаются все карточки списков.
      </p>
      <p>
        Преимущество использования Redux заключается в том, что вся логика,
        необходимая для добавления списка в избранное, содержится в{' '}
        <code>ListingFavoriteButton</code>. Диспатчинг действий будет работать
        напрямую из этого компонента в хранилище Redux, которое затем будет
        доступно из любого места в нашем приложении.
      </p>
      <p>
        Нам нужно будет немного изменить стили нашего компонента{' '}
        <code>ListingCard</code>, чтобы кнопка поместилась в верхнем правом углу
        изображения. Мы будем использовать абсолютное позиционирование для этого,
        чтобы она была четко видна.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingCard</code> со следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[5, 12, 13, 14, 15, 16, 17, 18]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithFavoriteButtonCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsCardWithFavoriteButtonCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, Separator } from '@/components/ui';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages listing={listing} />
      <Separator className='my-4' />
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
        </div>
        <ListingFavoriteButton listing={listing} />
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;`;

export const Step15 = () => {
  return (
    <div>
      <h2>
        Добавление <code>ListingFavoriteButton</code> в компонент{' '}
        <code>ListingDetailsCard</code>
      </h2>
      <p>
        Наконец, нам нужно добавить <code>ListingFavoriteButton</code> в{' '}
        <code>ListingDetailsCard</code>. Это позволит пользователям добавлять
        список в избранное на странице деталей списка.
      </p>
      <p>
        Преимущество такого подхода в том, что поскольку наше приложение теперь
        использует глобальное состояние, добавление избранного списка с любой
        страницы автоматически будет синхронизироваться со всеми другими
        компонентами, которые используют то же состояние. Это включает в себя
        отображение их на странице "Избранное", а также обновление каждого
        экземпляра <code>ListingFavoriteButton</code>.
      </p>
      <p>
        Это происходит потому, что каждый компонент получает доступ к одному и
        тому же состоянию через хуки <code>useSelector</code> и обновляет
        то же состояние через вызовы <code>dispatch</code>. Существует только один
        источник правды, и все компоненты слушают его. Redux — действительно
        отличный инструмент!
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingDetailsCard</code> со
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[4, 12, 35, 36]}
        title='src/components/ListingDetailsCard.jsx'
      >
        {listingDetailsCardWithFavoriteButtonCode}
      </CodeHighlighter>
    </div>
  );
};


export const Completed = () => {
  return (
    <div className='relative'>
      <CheckCircle className='mx-auto mb-8 h-40 w-40' />
      <h2>Модуль завершен!</h2>
      <p>
        Поздравляем! Вы успешно завершили 6-й модуль курса. Теперь у вас
        должны быть данные из Redux store, а также возможность добавлять и
        удалять объявления из избранного, чтобы они отображались на странице
        «Избранное»!
      </p>
      <p>
        В этом модуле вы узнали, как настроить и использовать Redux, как
        создать хранилище, действия и редюсеры, а также как соединить все это
        из разных компонентов. Вы перенесли получение объявлений в Redux и
        добавили возможность добавлять объявления в избранное!
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>7-forms-and-authentication</code> из выпадающего списка выше.
        Увидимся там!
      </p>
      <h3>Завершенные задачи</h3>
      <Separator className='mb-2' />
      <TaskList checked tasks={tasks} />
      <div className='absolute -top-6'>
        <Confetti
          numberOfPieces={200}
          recycle={false}
          height={window.innerHeight - 200}
          width={650}
        />
      </div>
    </div>
  );
};

