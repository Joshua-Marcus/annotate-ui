import { format } from "../node_modules/date-fns/format";
import { COLORMAP, ColorMap } from "./utils/colorMap";

const { widget, currentUser } = figma;
const { useSyncedState, AutoLayout, usePropertyMenu, Text, Input, SVG, Frame } =
  widget;

// TODO
/*
2. Show Username and image
3. Show Date
4. add connector line option (left, top, right, bottom)
*/

function Widget() {
  const [text, setText] = useSyncedState("text", "");
  const [type, setType] = useSyncedState("type", "behavior");
  const [createdDate, _] = useSyncedState(
    "createdDate",
    format(new Date(), "dd/MM/yyyy HH:mm a")
  );
  const [connectorLine, setConnectorLine] = useSyncedState(
    "connectorLine",
    "off"
  );

  usePropertyMenu(
    [
      {
        itemType: "dropdown",
        propertyName: "type",
        tooltip: "Annotation Type",
        options: [
          {
            option: "behavior",
            label: "Behavior",
          },
          {
            option: "requirement",
            label: "Requirement",
          },
          {
            option: "animation",
            label: "Animation",
          },
          {
            option: "accessibility",
            label: "Accessibility",
          },
          {
            option: "tracking",
            label: "Tracking",
          },
        ],
        selectedOption: type,
      },
      {
        itemType: "dropdown",
        propertyName: "connectorLine",
        tooltip: "Connector Line",
        options: [
          {
            option: "off",
            label: "Off",
          },
          {
            option: "left",
            label: "Left",
          },
          {
            option: "right",
            label: "Right",
          },
          {
            option: "bottom",
            label: "Bottom",
          },
        ],
        selectedOption: connectorLine,
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "type") {
        setType(propertyValue || "behavior");
      } else if (propertyName === "connectorLine") {
        setConnectorLine(propertyValue || "off");
      }
    }
  );

  return (
    <AutoLayout
      direction={connectorLine === "bottom" ? "vertical" : "horizontal"}
      horizontalAlignItems={"center"}
      verticalAlignItems={"center"}
    >
      {connectorLine === "left" && (
        <SVG
          rotation={180}
          src={`<svg width="213" height="22" viewBox="0 0 213 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 9C0.895431 9 0 9.89543 0 11C0 12.1046 0.895431 13 2 13V9ZM191.333 11C191.333 16.891 196.109 21.6667 202 21.6667C207.891 21.6667 212.667 16.891 212.667 11C212.667 5.10896 207.891 0.333333 202 0.333333C196.109 0.333333 191.333 5.10896 191.333 11ZM2 13H202V9H2V13Z" fill="${
            COLORMAP[type as keyof ColorMap]
          }"/>
</svg>`}
        />
      )}
      <AutoLayout
        direction="vertical"
        verticalAlignItems={"center"}
        spacing={12}
      >
        <AutoLayout
          cornerRadius={4}
          padding={8}
          fill={COLORMAP[type as keyof ColorMap]}
        >
          <Text
            fill={"#FFFFFF"}
            fontWeight={700}
            fontFamily="Inter"
            fontSize={16}
            horizontalAlignText="center"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </AutoLayout>
        <AutoLayout
          direction="vertical"
          horizontalAlignItems={"end"}
          stroke={{
            type: "solid",
            color: COLORMAP[type as keyof ColorMap],
          }}
          cornerRadius={4}
          strokeWidth={4}
          padding={{
            top: 24,
            bottom: 24,
            left: 16,
            right: 16,
          }}
          spacing={4}
          fill={"#FFFFFF"}
        >
          <Input
            value={text}
            placeholder="Add comments..."
            fontSize={16}
            width={300}
            onTextEditEnd={(e) => {
              setText(e.characters);
            }}
            inputFrameProps={{
              fill: "#FFFFFF",
              padding: 8,
            }}
            inputBehavior="wrap"
          />
          <Text fontSize={14} fontFamily="Inter" fontWeight={600}>
            {createdDate}
          </Text>
          <AutoLayout
            fill={"#E6E6E6"}
            direction="horizontal"
            spacing={8}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            cornerRadius={4}
            padding={{
              left: 8,
              right: 8,
              top: 4,
              bottom: 4,
            }}
          >
            {currentUser?.photoUrl && (
              <Frame
                fill={{
                  type: "image",
                  src: currentUser.photoUrl,
                }}
                width={30}
                height={30}
                cornerRadius={4}
              />
            )}
            <Text fontFamily="Inter" fontSize={16} fontWeight={600}>
              {currentUser?.name}
            </Text>
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
      {(connectorLine === "right" || connectorLine === "bottom") && (
        <SVG
          opacity={0.5}
          rotation={connectorLine === "bottom" ? -90 : 0}
          src={`<svg width="213" height="22" viewBox="0 0 213 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 9C0.895431 9 0 9.89543 0 11C0 12.1046 0.895431 13 2 13V9ZM191.333 11C191.333 16.891 196.109 21.6667 202 21.6667C207.891 21.6667 212.667 16.891 212.667 11C212.667 5.10896 207.891 0.333333 202 0.333333C196.109 0.333333 191.333 5.10896 191.333 11ZM2 13H202V9H2V13Z" fill="${
            COLORMAP[type as keyof ColorMap]
          }"/>
</svg>`}
        />
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
