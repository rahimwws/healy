import { Layout, Typography } from '@/shared/ui';
import { ScrollView } from 'react-native';

export default function CreateName() {
  return (
    <Layout>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Typography>Create Name</Typography>
      </ScrollView>
    </Layout>
  );
}
