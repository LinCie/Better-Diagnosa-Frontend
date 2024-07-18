import { Container, Typography, Card, CardContent } from "@mui/material";

const DengueInfo = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Cara Menangani Ketika Didiagnosis Demam Berdarah Dengue
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            1. Istirahat yang Cukup
          </Typography>
          <Typography paragraph>
            Penderita demam berdarah perlu banyak istirahat agar tubuh bisa
            melawan virus dan mempercepat proses pemulihan.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Minum Banyak Cairan
          </Typography>
          <Typography paragraph>
            Pastikan untuk minum banyak air, jus buah, dan cairan elektrolit
            untuk mencegah dehidrasi.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Konsumsi Obat Penurun Demam
          </Typography>
          <Typography paragraph>
            Gunakan parasetamol untuk menurunkan demam dan meredakan nyeri.
            Hindari penggunaan aspirin atau ibuprofen karena dapat meningkatkan
            risiko perdarahan.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Pantau Gejala
          </Typography>
          <Typography paragraph>
            Pantau gejala secara teratur. Jika mengalami gejala seperti
            perdarahan, nyeri perut hebat, muntah terus-menerus, atau merasa
            sangat lemah, segera cari pertolongan medis.
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Konsultasi dengan Dokter
          </Typography>
          <Typography paragraph>
            Selalu berkonsultasi dengan dokter untuk pemantauan lebih lanjut dan
            mengikuti petunjuk medis dengan cermat.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DengueInfo;
