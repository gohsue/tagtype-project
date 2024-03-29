import { gql } from '@apollo/client';

export const GET_FONT_BY_FONT_ID = gql`
  query GetFontByFontId($font_id: Int) {
    getFontByFontId(font_id: $font_id) {
      id
      name
      description
      corporation
      is_web_font
      webFont {
        source
      }
      imageFont {
        title
        unit
        detail_mobile
        detail_pc
      }
    }
  }
`;

export const CREATE_WEB_FONT = gql`
  # mutation CreateWebFont($name: String, $description: String, $corporation: String, $is_web_font: Boolean, $source: String) {
  #   createWebFont(name: $name, description: $description, corporation: $corporation, is_web_font: $is_web_font, source: $source)
  # }
  mutation CreateWebFont($name: String, $description: String, $corporation: String, $is_web_font: Boolean, $source: String) {
    createWebFont(name: $name, description: $description, corporation: $corporation, is_web_font: $is_web_font, source: $source)
    {
      id
    }
  }
`;

export const UPDATE_WEB_FONT = gql`
  mutation UpdateWebFont($font_id: Int!, $name: String, $description: String, $corporation: String, $is_web_font: Boolean, $source: String) {
    updateWebFont(font_id: $font_id, name: $name, description: $description, corporation: $corporation, is_web_font: $is_web_font, source: $source)
  }
`;

export const CREATE_IMAGE_FONT = gql`
  mutation CreateImageFont(
    $name: String
    $description: String
    $corporation: String
    $is_web_font: Boolean
    $title: String
    $unit: String
    $detail_mobile: String
    $detail_pc: String
  ) {
    createImageFont(
      name: $name
      description: $description
      corporation: $corporation
      is_web_font: $is_web_font
      title: $title
      unit: $unit
      detail_mobile: $detail_mobile
      detail_pc: $detail_pc
    )
    {
      id
    }
  }
`;

export const UPDATE_IMAGE_FONT = gql`
  mutation UpdateImageFont(
    $font_id: Int!
    $name: String
    $description: String
    $corporation: String
    $is_web_font: Boolean
    $title: String
    $unit: String
    $detail_mobile: String
    $detail_pc: String
  ) {
    updateImageFont(
      font_id: $font_id
      name: $name
      description: $description
      corporation: $corporation
      is_web_font: $is_web_font
      title: $title
      unit: $unit
      detail_mobile: $detail_mobile
      detail_pc: $detail_pc
    )
  }
`;

export const DELETE_FONT = gql`
  mutation DeleteFontByFontId($font_id: Int!) {
    deleteFontByFontId(font_id: $font_id)
  }
`;
