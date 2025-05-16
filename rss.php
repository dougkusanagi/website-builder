<?php

function xml_to_array(SimpleXMLElement $xml)
{
    $parser = function (SimpleXMLElement $xml, array $collection = []) use (&$parser) {
        $nodes = $xml->children();
        $attributes = $xml->attributes();

        if (0 !== count($attributes)) {
            foreach ($attributes as $attrName => $attrValue) {
                $collection['attributes'][$attrName] = html_entity_decode(strval($attrValue));
            }
        }

        if (0 === $nodes->count()) {
            // $collection['value'] = strval($xml);
            // return $collection;
            return html_entity_decode(strval($xml));
        }

        foreach ($nodes as $nodeName => $nodeValue) {
            if (count($nodeValue->xpath('../' . $nodeName)) < 2) {
                $collection[$nodeName] = $parser($nodeValue);
                continue;
            }

            $collection[$nodeName][] = $parser($nodeValue);
        }

        return $collection;
    };

    return [
        $xml->getName() => $parser($xml)
    ];
}

function parseRssTemplate($template, $feedData)
{
    foreach ($feedData as $key => $value) {
        if ($value != null) {
            $template = str_replace('@' . $key, $value, $template);
        }
    }

    if (isset($feedData['item_enclosure_url']) && $feedData['item_enclosure_url'] != '') {
        if (strpos($feedData['item_enclosure_type'], 'video') !== false) {
            $html = '<video controls width="320">
                        <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="audio/mpeg">
                        Your browser does not support the audio element.
                </video>';
        } elseif (strpos($feedData['item_enclosure_type'], 'video') !== false) {
            $html = '<audio controls>
                        <source src="' . $feedData['item_enclosure_url'] . '" type="audio/mpeg">
                        Your browser does not support the audio element.
                </audio>';
        } else {
            $html = '<img class="my-2" src="' . $feedData['item_enclosure_url'] . '" height="100px" />';
        }
        $template = str_replace('@item_enclosure', $html, $template);
    }

    return $template;
}

function parseRss($config)
{
    $rss = [];

    // Parse RSS content
    $rssArray = xml_to_array(simplexml_load_string(file_get_contents($config['url']), 'SimpleXMLElement', LIBXML_NOCDATA));
    $rssFeed = simplexml_load_string(file_get_contents($config['url']), 'SimpleXMLElement', LIBXML_NOCDATA);

    // Take 10 records only
    $records = array_slice($rssArray['rss']['channel']['item'], 0, $config['size']);

    // feed data
    $feedData = [];
    $feedData['feed_title'] = (string) $rssFeed->channel->title;
    $feedData['feed_description'] = $rssFeed->channel->description->__toString();
    $feedData['feed_link'] = $rssFeed->channel->link->__toString();
    $feedData['feed_pubdate'] = $rssFeed->channel->pubDate->__toString();
    $feedData['feed_build_date'] = $rssFeed->channel->lastBuildDate->__toString();

    // feed parse template
    $rss['FeedTitle'] = parseRssTemplate($config['templates']['FeedTitle']['template'], $feedData);
    $rss['FeedSubtitle'] = parseRssTemplate($config['templates']['FeedSubtitle']['template'], $feedData);
    $rss['FeedTagdLine'] = parseRssTemplate($config['templates']['FeedTagdLine']['template'], $feedData);

    // records
    $rss['items'] = [];
    $count = 0;
    foreach ($rssFeed->channel->item as $item) {
        // item data
        $itemData['item_title'] = $item->title;
        $itemData['item_pubdate'] = $item->pubDate;
        $itemData['item_description'] = $item->description;
        $itemData['item_url'] = $item->link;
        $itemData['item_enclosure_url'] = $item->enclosure['url'];
        $itemData['item_enclosure_type'] = $item->enclosure['type'];

        // item parse template
        $item = [];
        $item['ItemTitle'] = parseRssTemplate($config['templates']['ItemTitle']['template'], $itemData);
        $item['ItemDescription'] = parseRssTemplate($config['templates']['ItemDescription']['template'], $itemData);
        $item['ItemMeta'] = parseRssTemplate($config['templates']['ItemMeta']['template'], $itemData);
        $item['ItemEnclosure'] = parseRssTemplate($config['templates']['ItemEnclosure']['template'], $itemData);
        $item['ItemStats'] = parseRssTemplate($config['templates']['ItemStats']['template'], $itemData);

        // add item to rss items
        $rss['items'][] = $item;

        $count += 1;
        if ($config['size'] == $count) {
            break;
        }
    }

    $templates = $config['templates'];

    // return json_encode($rss);

    // // Return HTML
    // return view('helpers.rss.template', [
    //     'rss' => $rss,
    //     'templates' => $config['templates'],
    // ]);?>
        <div>
            <div class="">
                <div class="text-center pt-4">
                    <?php if ($templates['FeedTitle']['show'] == 'true') { ?>
                        <h1 rss-item="FeedTitle" class="fw-normal fs-4 mt-2"><?php echo $rss['FeedTitle']; ?></h1>
                    <?php } ?>
                    <?php if ($templates['FeedSubtitle']['show'] == 'true') { ?>
                        <p  rss-item="FeedSubtitle">
                            <?php echo $rss['FeedSubtitle']; ?>
                        </p>
                    <?php } ?>
                </div>
            </div>
        </div>

        <?php if ($templates['FeedTagdLine']['show'] == 'true') { ?>
            <div>
                <div rss-item="FeedTagdLine" class="py-3">
                    <div class="border-bottom text-muted small"><span><?php echo $rss['FeedTagdLine']; ?></span></div>
                </div>
            </div>
        <?php } ?>

        <?php foreach ($rss['items'] as $item) { ?>
            <div>
                <div class="py-3 mb-3">
                    <?php if ($templates['ItemTitle']['show'] == 'true') { ?>
                        <h5 rss-item="ItemTitle" class="mb-2" style="font-size: 19px;font-weight: bold;">
                            <?php echo $item['ItemTitle']; ?>
                        </h5>
                    <?php } ?>
                    <?php if ($templates['ItemMeta']['show'] == 'true') { ?>
                        <div rss-item="ItemMeta" class="d-flex align-items-center my-2">
                            <?php echo $item['ItemMeta']; ?>
                        </div>
                    <?php } ?>
                    <div class="d-flex">
                        <div>
                            <?php if ($templates['ItemDescription']['show'] == 'true') { ?>
                                <p rss-item="ItemDescription" class="">
                                    <?php echo $item['ItemDescription']; ?>
                                </p>
                            <?php } ?>
                            <?php if ($templates['ItemStats']['show'] == 'true') { ?>
                                <div rss-item="ItemStats">
                                    <div class="d-flex align-items-center small">
                                        <?php echo $item['ItemStats']; ?>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                        <?php if ($templates['ItemEnclosure']['show'] == 'true') { ?>
                            <div rss-item="ItemEnclosure" class="ml-auto ms-auto pl-4 ps-4">
                                <?php echo $item['ItemEnclosure']; ?>
                            </div>
                        <?php } ?>             
                    </div>
                    
                </div>
            </div>
        <?php } ?>
    <?php
}

echo parseRss($_GET['config']);
