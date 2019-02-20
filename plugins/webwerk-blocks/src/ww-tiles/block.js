/**
 * BLOCK: cgb
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import PostSelector from '@vermilion/post-selector';
// import TilesSelector from './TilesSelector';

const { registerBlockType } = wp.blocks;
const { Fragment, RawHTML } = wp.element;
const { InspectorControls, MediaUpload, MediaUploadCheck, RichText } = wp.editor;
const { PanelBody, Button } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];



registerBlockType( 'ww/tiles-inner', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'WW - Kacheln', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		'WW - Kacheln',
		'Webwerk',
	],
  attributes: {
    mediaID: {
      type: 'number'
    },
		mediaURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
    },
		mediaAlt: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'alt',
    },
		posts: {
      type: 'array',
      default: []
    },
		content: {
			source: 'html',
			selector: 'span',
		},
    svgURL: {
        selector: 'use', // From tag use
        source: 'attribute', // binds an attribute of the tag
        attribute: 'href', // binds href of use: the svg url
    },
  },

  edit(props) {
        const {
            className,
						attributes,
            attributes: {
                content,
								mediaID,
                mediaURL,
								mediaAlt,
								posts,
                svgURL,
            },
            setAttributes,
        } = props;

    var templateURL = ww_blocks.templateUrl;

    setAttributes({svgURL: templateURL + '/img/icons.svg#button-next'});

		const onSelectImage = ( media ) => {
            setAttributes( {
                mediaURL: media.url,
								mediaID: media.id,
                mediaAlt: media.alt,
            } );
        };

    	return ([
    		<MediaUploadCheck>
    			<MediaUpload
    				onSelect={ onSelectImage }
    				allowedTypes={ ALLOWED_MEDIA_TYPES }
    				value={ mediaID }
    				render={ ( { open } ) => (
    					<Button onClick={ open }>
    						{ ! mediaID ? 'Bild hinzufügen' : null }
    					</Button>
    				) }
    			/>
    		</MediaUploadCheck>,
				<PostSelector
              onPostSelect={post => {
                attributes.posts.push(post);
                setAttributes({ posts: [...attributes.posts] });
              }}
              posts={attributes.posts}
              onChange={newValue => {
                setAttributes({ posts: [...newValue] });
              }}
              postType={'page'}
            />,
				<div class="tile-item">
          <a class="tile-item__link" href="#">
            <div class="tile-item-button">
              <svg role="img" class="symbol" aria-hidden="true" focusable="false">
                <use href={svgURL}></use>
              </svg>
              <RichText
                tagName="span"
                className={ className }
                value={ attributes.content }
                onChange={ ( content ) => setAttributes( { content } ) }
                placeholder="Hier Text eingeben."
                />
            </div>
    				{ mediaID ? <img src={ mediaURL } alt={ mediaAlt } /> : null }
          </a>
				</div>
    	]);
  },

  save( { attributes } ) {

    return (
      <div class="tile-item">
        <a class="tile-item__link" href="#">
          <div class="tile-item-button">
            <svg role="img" class="symbol" aria-hidden="true" focusable="false">
              <use href={attributes.svgURL}></use>
            </svg>
            <RichText.Content tagName="span" value={ attributes.content } />
          </div>
          <img src={ attributes.mediaURL } alt={ attributes.mediaAlt } />
        </a>
      </div>
    );
  }
});
