import {
  DescriptionContainer,
  DescriptionText,
  Title,
  Subtitle,
  Paragraph,
  List,
  ListItem,
  Note,
} from './TextDescriptionStyled';
import descriptionContent from '../../utils/descriptionContent';

function TextDescription({ language }) {
  const content = descriptionContent[language];

  return (
    <DescriptionContainer>
      <DescriptionText>
        {content.map((item, index) => {
          switch (item.type) {
            case 'title':
              return <Title key={index}>{item.content}</Title>;
            case 'subtitle':
              return <Subtitle key={index}>{item.content}</Subtitle>;
            case 'paragraph':
              return <Paragraph key={index}>{item.content}</Paragraph>;
            case 'note':
              return <Note key={index}>{item.content}</Note>;
            case 'list':
              return (
                <List key={index}>
                  {item.items.map((li, i) => {
                    if (typeof li === 'string') {
                      return <ListItem key={i}>{li}</ListItem>;
                    } else {
                      return (
                        <ListItem key={i}>
                          <strong>{li.label}</strong>: {li.description}
                        </ListItem>
                      );
                    }
                  })}
                </List>
              );
            default:
              return null;
          }
        })}
      </DescriptionText>
    </DescriptionContainer>
  );
}

export default TextDescription;
