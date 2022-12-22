import { useState, useEffect, useRef, useMemo } from "react";
import {
  render,
  View,
  Text,
  Sprite,
  Image,
  TEXTURE_WHITE,
  useMultiRef,
} from "react-luma";
import {
  focusable,
  NavigationProvider,
  focusableSection,
  useFocusedElement,
} from "react-luma/navigation";
import { useAnimation } from "react-luma/animation";
import { ReactLumaElement, ReactLumaElementStyle } from "react-luma";

const TMDB_API_KEY = "fbba46e1c3147f982c3b7d32995add6b";

const swimlanesData = [
  {
    id: "swimlane_top_movies",
    title: "Top movies",
    tmdbPath: "/movie/popular",
  },
  {
    id: "swimlane_popular_tv",
    title: "Top on TV",
    tmdbPath: "/tv/popular",
  },
  {
    id: "swimlane_upcoming_movies",
    title: "Upcoming movies",
    tmdbPath: "/movie/upcoming",
  },
];

function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
}

type SwimlaneItemProps = {
  imageSrc: string;
};

const SwimlaneItem = focusable<SwimlaneItemProps>((props) => {
  return (
    <Sprite
      style={{
        width: 110,
        height: 160,
        alignItems: "center",
        justifyContent: "center",
      }}
      tint={props.isFocus ? "#ffffff" : "#ffffff"}
      texture={TEXTURE_WHITE}
    >
      <Image src={props.imageSrc} style={{ width: 100, height: 150 }} />
    </Sprite>
  );
});

type SwimlaneProps = {
  id: string;
  title: string;
  tmdbPath: string;
};

const Swimlane = focusableSection<SwimlaneProps, ReactLumaElement>((props) => {
  const ref = useRef<ReactLumaElement>();
  const [focusedElement] = useFocusedElement();

  const data = useFetchData<{
    results: {
      id: string;
      poster_path: string;
    }[];
  }>(`https://api.themoviedb.org/3${props.tmdbPath}?api_key=${TMDB_API_KEY}`);

  const refX = useRef<number>(0);

  const x = useMemo(() => {
    if (focusedElement && props.isFocus) {
      refX.current =
        ref.current!.getGlobalPosition().x -
        focusedElement.getGlobalPosition().x;
    }
    return refX.current;
  }, [props.isFocus, focusedElement]);

  useAnimation(x, (newX) => {
    ref.current!.x = newX;
  });

  return (
    <View ref={props.forwardedRef} style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 6 }} text={props.title} />
      <View ref={ref} style={{ flexDirection: "row" }}>
        {data ? (
          data.results.map((item) => (
            <SwimlaneItem
              key={item.id}
              imageSrc={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            />
          ))
        ) : (
          <Text text="Loading..." />
        )}
      </View>
    </View>
  );
});

function BorderBox() {
  const borderWidth = 7;
  const width = 110;
  const height = 160;
  return (
    <View
      style={{ position: "absolute" }}
      transform={{
        x: 13,
        y: 36 + 300,
      }}
    >
      <Sprite
        tint="#ff0000"
        texture={TEXTURE_WHITE}
        style={{ position: "absolute", width: borderWidth, height: height }}
      />
      <Sprite
        tint="#ff0000"
        texture={TEXTURE_WHITE}
        style={{ width: borderWidth, height: height }}
        transform={{ position: "absolute", x: width - borderWidth }}
      />
      <Sprite
        tint="#ff0000"
        texture={TEXTURE_WHITE}
        style={{ position: "absolute", width: width, height: borderWidth }}
      />
      <Sprite
        tint="#ff0000"
        texture={TEXTURE_WHITE}
        style={{ position: "absolute", width: width, height: borderWidth }}
        transform={{ position: "absolute", y: height - borderWidth }}
      />
    </View>
  );
}

function Swimlanes() {
  const [_, focusedElementSectionId] = useFocusedElement();
  const containerRef = useRef<ReactLumaElement>();
  const [swimlaneElements, registerSwimlaneElement] =
    useMultiRef<ReactLumaElement>();

  const y = useMemo(() => {
    if (!focusedElementSectionId) {
      return 0;
    }
    const swimlaneElement = swimlaneElements[focusedElementSectionId];
    return swimlaneElement
      ? containerRef.current!.getGlobalPosition().y -
          swimlaneElement.getGlobalPosition().y
      : 0;
  }, [focusedElementSectionId]);

  return (
    <View>
      <View
        ref={containerRef}
        style={{ marginLeft: 12, marginTop: 300 }}
        transform={{ y }}
      >
        {swimlanesData.map((data) => (
          <Swimlane
            key={data.id}
            sectionId={data.id}
            ref={registerSwimlaneElement(data.id)}
            id={data.id}
            title={data.title}
            tmdbPath={data.tmdbPath}
          />
        ))}
      </View>
      <View
        style={{
          height: 300,
          width: "100%",
          padding: 12,
          position: "absolute",
        }}
      >
        <Sprite
          tint="#f5f5f5"
          texture={TEXTURE_WHITE}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <BorderBox />
    </View>
  );
}

type MenuItemProps = {
  title: string;
  style?: ReactLumaElementStyle;
};

const MenuItem = focusable<MenuItemProps>((props) => {
  const formattedTitle = props.isSectionFocus
    ? props.title
    : props.title.substring(0, 1);
  return (
    <Text
      style={props.style}
      text={formattedTitle}
      fill={props.isFocus ? "#ff0000" : "#000000"}
    />
  );
});

const Menu = focusableSection((props) => {
  return (
    <View style={{ flexDirection: "column", width: props.isFocus ? 100 : 20 }}>
      {props.children}
    </View>
  );
});

function App() {
  return (
    <NavigationProvider>
      <View style={{ flexDirection: "row", padding: 12, marginTop: 12 }}>
        <Menu sectionId="mainMenu">
          <MenuItem title="One" style={{ marginBottom: 12 }} />
          <MenuItem title="Two" style={{ marginBottom: 12 }} />
          <MenuItem title="Three" />
        </Menu>
        <View style={{ flexDirection: "column" }}>
          <Swimlanes />
        </View>
      </View>
    </NavigationProvider>
  );
}

const container = document.getElementById("root");
if (container instanceof HTMLCanvasElement) {
  render(<App />, container, {
    width: 1080,
  });
}
