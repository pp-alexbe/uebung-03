/**
 * BLOCK: Webwerk - Block Container
 *
 * Registering a basic block with Gutenberg.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks;
const { RangeControl } = wp.components;
const { withState } = wp.compose;
const {
  InnerBlocks,
  InspectorControls,
  RichText
} = wp.editor;

const MyRangeControl = withState( {
        columns: 2,
} )( ( { columns, setState } ) => (
    <RangeControl
        label="Spalten"
        value={ columns }
        onChange={ ( columns ) => setState( { columns } ) }
        min={ 2 }
        max={ 3 }
    />
) );

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ww/columns', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'WW - Spalten', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		'WW - Spalten',
		'Webwerk',
	],
  attributes: {
            // To storage text colour of the button
            section_class: {
                type: 'string',
                default: '', // Default value for newly added block
            },
            pagewrap_class: {
                type: 'string',
                default: '', // Default value for newly added block
            }
},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {

    var section_class = props.attributes.section_class // To bind section_class
    var pagewrap_class = props.attributes.pagewrap_class // To bind pagewrap_class

    //
    // onChange event functions
    //
    function onChangeSectionClass ( content ) {
        props.setAttributes({section_class: content})
    }

    function onChangePagewrapClass ( content ) {
        props.setAttributes({pagewrap_class: content})
    }

    function ContentsSPW() {

      if (section_class && pagewrap_class)  {
        section_class = 'section ' + section_class;
        pagewrap_class = 'page-wrap ' + pagewrap_class;
      } else if (section_class) {
        section_class = 'section ' + section_class;
        pagewrap_class = 'page-wrap';
      } else if (pagewrap_class) {
        section_class = 'section';
        pagewrap_class = 'page-wrap ' + pagewrap_class;
      } else {
        section_class = 'section';
        pagewrap_class = 'page-wrap';
      }

        return (
          <div className={ props.className }>
            <div className={section_class}>
              <div className={pagewrap_class}>
                <InnerBlocks />
              </div>
            </div>
          </div>
        );
    }

		return ([
      <InspectorControls>
        <div id="ww-container-inspector-control-wrapper">
          <label class="blocks-base-control__label" for="mce_1">Section class</label>
          <RichText
            format="string"             // Default is 'element'. Wouldn't work for a tag attribute
            className="ww-container-inspector-control-field"
            onChange={onChangeSectionClass} // onChange event callback
            value={section_class} // Input Binding
            />
            <label class="blocks-base-control__label" for="mce_2">Page-wrap class</label>
            <RichText
              format="string"             // Default is 'element'. Wouldn't work for a tag attribute
              className="ww-container-inspector-control-field"
              onChange={onChangePagewrapClass} // onChange event callback
              value={pagewrap_class} // Input Binding
              />
        </div>
      </InspectorControls>,
      <ContentsSPW />
    ]);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {

    function ContentsSPW() {
      var section_class = props.attributes.section_class;
      var pagewrap_class = props.attributes.pagewrap_class;

      if (section_class && pagewrap_class)  {
        section_class = 'section ' + section_class;
        pagewrap_class = 'page-wrap ' + pagewrap_class;
      } else if (section_class) {
        section_class = 'section ' + section_class;
        pagewrap_class = 'page-wrap';
      } else if (pagewrap_class) {
        section_class = 'section';
        pagewrap_class = 'page-wrap ' + pagewrap_class;
      } else {
        section_class = 'section';
        pagewrap_class = 'page-wrap';
      }

        return (
          <div className={section_class}>
            <div className={pagewrap_class}>
              <InnerBlocks.Content />
            </div>
          </div>
        );
    }

      return (
        <ContentsSPW />
      );
}
} );
