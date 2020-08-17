import Carousel from "react-native-snap-carousel";
import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { sliderWidth, itemWidth } from "../../styles/SliderEntry.style";
import SliderEntry from "../../components/SliderEntry";
import styles, { colors } from "../../styles/index.style";
import { ENTRIES1 } from "../../static/welcomingEntries";
import { SafeAreaConsumer } from "react-native-safe-area-context";

const SLIDER_1_FIRST_ITEM = 0;

export default class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }

    _renderItem({ item, index }) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={false}
                parallaxProps={parallaxProps}
            />
        );
    }

    _renderLightItem({ item, index }) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem({ item, index }) {
        return <SliderEntry data={item} even={true} />;
    }

    render() {
        const { slider1ActiveSlide } = this.state;

        return (
            <SafeAreaConsumer>
                {insets => (
                    <View
                        style={[
                            { paddingTop: insets.top },
                            styles.exampleContainer
                        ]}
                    >
                        <Carousel
                            ref={c => (this._slider1Ref = c)}
                            data={ENTRIES1}
                            renderItem={this._renderItemWithParallax}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            hasParallaxImages={false}
                            firstItem={SLIDER_1_FIRST_ITEM}
                            inactiveSlideScale={0.84}
                            inactiveSlideOpacity={0.7}
                            // inactiveSlideShift={20}
                            containerCustomStyle={styles.slider}
                            contentContainerCustomStyle={
                                styles.sliderContentContainer
                            }
                            loop={true}
                            // loopClhttps://i.imgur.com/UYiroysl.jpgonesPerSide={2}
                            autoplay={true}
                            autoplayDelay={1000}
                            autoplayInterval={3000}
                            onSnapToItem={index =>
                                this.setState({
                                    slider1ActiveSlide: index
                                })
                            }
                        />

                        <Button
                            dark={true}
                            style={{
                                height: hp("10%"),
                                alignContent: "center",
                                justifyContent: "center"
                            }}
                            mode="contained"
                            onPress={() =>
                                this.props.navigation.navigate("MapScreen")
                            }
                        >
                            LISTO!
                        </Button>
                    </View>
                )}
            </SafeAreaConsumer>
        );
    }
}
